import { formatDate } from "@/utils";

enum Method {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
}

export class ApiService {
  private static instance: ApiService;
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;
  private sessionId: string = "";

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
      ApiService.instance.initCredentials();
    }
    return ApiService.instance;
  }

  public async getVehicles() {
    return this.sendApiRequest(Method.POST, "/query", {
      sql: `
            select
            cv.Id, cv.Model, cv.Customer, cv.ProductLookup,
            cv.VIN, cv.VehicleLookup, p.Name as ProductName
            from CustomerVehicles cv
            left join Product p on cv.ProductLookup = p.Id
            where cv.AccountId = ${process.env.NEXT_PUBLIC_ACCOUNT_ID}
        `,
    });
  }

  public async getSubscriptionOptions() {
    return this.sendApiRequest(Method.POST, "/query", {
      sql: `
        select
          p.Id,
          p.Name,
          case when p.Name = 'Safety Plus with Security Plus 6 Month Trial'
          then '$0.00'
          else p.Rate
          end as Rate
        from Product p
        where p.Name in ('Security Plus Annual', 'Safety Plus with Security Plus 6 Month Trial')
        order by p.Name ASC
      `,
    });
  }

  public async getServices(vehicleId: string) {
    return this.sendApiRequest(Method.POST, "/query", {
      sql: `
        select
          s.Id,
          s.Entitlement3 as ConciergeServices,
          s.Entitlement5 as WiFi
        from ServicePackage s
        where s.VehiclesId = ${vehicleId}
      `,
    });
  }

  public async getAllVehicles() {
    const sql = `
       select
          v.Engine,
          v.Id,
          v.Model,
          v.Transmission,
          v.Year,
          v.extColor,
          v.intColor,
          v.vehicleTrim
      from vehicles v
      where 1=1
    `;
    return this.sendApiRequest(Method.POST, "/query", { sql });
  }

  public async upgradeSubscription(selectedOptionId: string): Promise<{ error?: string } | null> {
    try {
      const subscriptionResponse = await this.sendApiRequest(
        Method.POST,
        "/query",
        {
          sql: `
          select ap.Id, ap.EndDate
          from account_product ap
          join product p on ap.ProductId = p.Id
          join rating_method rm on p.RatingMethodId = rm.Id
          where ap.AccountId = ${process.env.NEXT_PUBLIC_ACCOUNT_ID}
          and rm.RatingMethodType = 'Subscription'
        `,
        }
      );
      if (subscriptionResponse.queryResponse.length) {
        const subscription = subscriptionResponse.queryResponse[0];
        const updateSubscriptionResponse = await this.sendApiRequest(
          Method.PUT,
          "/ACCOUNT_PRODUCT",
          {
            brmObjects: [
              {
                Id: subscription.Id,
                EndDate: formatDate(new Date()),
              },
            ],
          }
        );
        if (
          updateSubscriptionResponse?.updateResponse?.[0].ErrorMessage?.trim()
        ) {
          return {
            error: updateSubscriptionResponse?.updateResponse?.[0].ErrorMessage,
          };
        }
        this.sendApiRequest(Method.POST, "/ACCOUNT_PRODUCT", {
          brmObjects: {
            AccountId: process.env.NEXT_PUBLIC_ACCOUNT_ID,
            Status: "ACTIVE",
            Quantity: 1,
            StartDate: formatDate(new Date()),
            EndDate: null,
            ProductId: selectedOptionId
          }
        });
        return null;
      } else {
        return { error: "Subscription not found" };
      }
    } catch {
      return { error: "Something went wrong" };
    }
  }

  private initCredentials() {
    const storedSession = globalThis.localStorage?.getItem("sessionId");
    if (storedSession) {
      this.sessionId = storedSession;
    } else {
      this.login();
    }
  }

  private async login() {
    const { loginResponse } = await this.sendApiRequest(Method.POST, "/login", {
      username: process.env.NEXT_PUBLIC_USER_NAME,
      password: process.env.NEXT_PUBLIC_USER_PASS,
    });
    if (loginResponse && loginResponse.length && loginResponse[0].SessionID) {
      this.sessionId = loginResponse[0].SessionID;
      globalThis.localStorage?.setItem(
        "sessionId",
        String(loginResponse[0].SessionID)
      );
    }
  }

  private async sendApiRequest(
    method: Method,
    path: string,
    data?: object,
    refreshSessionIfNeed = true
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        sessionId: this.sessionId,
      },
      body: JSON.stringify(data),
    });
    let json;
    try {
      json = await response.json();
    } catch {
      json = null;
    }
    if (
      refreshSessionIfNeed &&
      json.errors?.[0]?.error_code === "INVALID_SESSION_ID"
    ) {
      await this.login();
      return this.sendApiRequest(method, path, data, false);
    } else {
      return json;
    }
  }
}
