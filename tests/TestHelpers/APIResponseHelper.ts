class APIResponseHelper {

    public successfulAPIResponse(responseMsg?: any) {
        if (responseMsg) {
            return {
                status: 201,
                data: responseMsg
            }

        } else {
            return {
                status: 201,
                data: {
                    message: 'Success'
                }
            }
        }
    }

}
export default APIResponseHelper;