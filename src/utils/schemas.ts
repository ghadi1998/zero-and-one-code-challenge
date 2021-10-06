import { string, object, boolean } from "yup";
import axios from "axios";



export const jsonContentType = string()
    .required("Invalid JSON content type")
    .test("is-json", "Invalid content type header", (ct) => {
        if (typeof ct !== "string") {
            return false;
        }
        const split = ct.split(";");
        for (let i = 0; i < split.length; i++) {
            const value = split[i].trimStart();
            if (value === "application/json") {
                return true;
            }
            // charset can be here..
        }
        return false;
    });