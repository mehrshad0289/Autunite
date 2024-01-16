import axios from "axios";

export const AutuniteLogError = (code, error) => {
    try {
        axios.post(
            'api/log-error',
            {
                code,
                error
            },
        )
    } catch (e) {

    }
}