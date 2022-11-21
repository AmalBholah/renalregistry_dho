module.exports = {
    USER_LOGIN: "/User/Login",
    USER_VERIFY_OTP: "/User/VerifyOtp",

    USER_REGISTER_VALIDATE_BEFORE_REGISTER: "/Validation/ValidateRegister",
    USER_REGISTER_REQUEST_OTP: "/User/SendOtp",
    USER_REGISTER_AFTER_OTP: "/User/SaveRegister",

    USER_REMOVE_ACCOUNT_REQUEST_OTP: "/User/Logout",
    USER_REMOVE_ACCOUNT_VERIFY_OTP: "/User/VerifyOtp",

    USER_GET_DRAWER_DETAILS: "/User/getDrawerDtls",
    USER_PROFILE_CHANGE_REQUEST: "/User/ProfileChangeRequest",

    DEVICE_DETAILS_SAVE: "/DeviceDtls/SaveDeviceDtls",
    DEVICE_DETAILS_CLEAR: "/DeviceDtls/ClearDeviceDtls",

    USER_GET_POLICIES: "/Product/ViewAllPolicies",
    USER_GET_POLICIES_ACTISURE: "/Product/GetAllPoliciesV2",

    GET_CLAIM_HEALTH_DETAILS: "/HealthClaim/LoadHealthClaim",
    CLAIM_EDIT_HEALTH_CLAIM: "/HealthClaim/EditClaim",
    CLAIM_CREATE_HEALTH_CLAIM: "/HealthClaim/CreateClaim",

    CLAIM_HEALTH_CLAIMS_HISTORY: "/HealthClaim/ClaimsHistory",

    CLAIM_CREATE_MOTOR_CLAIM: "/MotorClaim/SwnMotorClaimNotif",

    REQUEST_QUOTE: "/Product/SendInstruction",

    RENEW_POLICY_CALCULATE_PREMIUM: "/Product/CalculatePremium",
    RENEW_POLICY: "/Product/SendInstruction",
    PPA_FORM_GET_BANK_NAME: "/Product/GetBankName",
    PPA_FORM_REQUEST_OTP: "/User/Login",
    PPA_FORM_VERIFY_OTP: "/User/VerifyOtp",
    PPA_FORM_SAVE: "/User/SavePPAform",

    LOANS_GET_LOAN_INTEREST_RATE: "/Utilities/getLoanInterestRate",
    LOANS_LOAN_TRACK: "/Product/LoanTrack",
    LOANS_LOAN_SAVE:  "/Product/LoanSave",

    NOTIFICATIONS_GET_NOTIFICATIONS: "/Notification/GetNotifications",

    PRODUCT_WER_LIFE_LOGIN: "/Product/WebLifeLogin",

    UTILITIES_DOCTOR_LIST: "/Utilities/DoctorLists",
    UTILITIES_BANK_LIST: "/Utilities/getBankRef",
    UTILITIES_GET_ASSISTANCE: "/Utilities/getAssistance",

    SWAN_CHECK_ONLINE_STATUS: ""
};