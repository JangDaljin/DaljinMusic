import { Platform } from "react-native";

export const API_SERVER = Platform.select({
    ios : 'http://localhost:8888',
    android : 'http://10.0.2.2:8888'
})