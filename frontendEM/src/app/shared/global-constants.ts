export class GlobalConstant {
    //Message
    public static genericError: string = "Something went wrong. Please try again later.";

    //Regex
    public static nameRegex: string = "[a-zA-Z0-9 ]*";
    public static emailRegex: string = "[a-zA-Z0-9._%-]+@[A-Za-z0-9.%-]+\\.[a-z]{2,3}";
    public static dateRegex: string = "^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$";
    public static numberRegex: string ="([1-9]|[1-9][0-9]|[1-9][0-9][0-9])"
    public static passwordRegex: string ="^.{4,15}$"
    //Variable
    public static error: string = "error";
}
