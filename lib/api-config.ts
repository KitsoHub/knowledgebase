export class ServiceEndPoints {
  public static readonly baseURL = 'http://localhost:8000'
  public static readonly apiBaseURL = `${ServiceEndPoints.baseURL}/api`
  public static readonly registerUser = `${ServiceEndPoints.apiBaseURL}/user/create/`
  public static readonly logInUser = `${ServiceEndPoints.apiBaseURL}/user/token/`
  public static readonly currentUser = `${ServiceEndPoints.apiBaseURL}/user/profile/`
  public static readonly getAllArtifacts = `${ServiceEndPoints.apiBaseURL}/artifacts/artifacts/`
  public static readonly createArtifacts = `${ServiceEndPoints.apiBaseURL}/artifacts/artifacts/`
  public static readonly getMetrics = `${ServiceEndPoints.apiBaseURL}/metrics/`
}
