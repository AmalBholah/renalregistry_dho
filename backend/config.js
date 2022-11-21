var config_env = {
    //Not to worry about the rest
    default: {
        BUCKET_NAME: "dev-clinicportal-documentstore",
        SWAN_URL_API: "https://secureuat.swanforlife.com/mySWNRESTAPI/api",
        SWAN_URL_API_ENCRYPTED: "https://secureuat.swanforlife.com/mySWNRESTAPI_Encrypt/api",
        SWAN_REQUEST_SOURCE: "V3APPTEST",
        OPENID_URL_API: "https://swan-oidc.idin.tech",
        OPENID_AUTHORIZATION: "Basic c3dhbi1ybmFwcDpGQzNCSjVoblI0ZENsU2tPWXdzWjZqVXl5d3Z1N2ZRWA==",
        RSA_KEY: {
            PUBLIC: 'jwtRS256_dev.key.pub',
            PRIVATE: 'jwtRS256_dev.key'
        },
        DATABASE_CONNECTION: 'mongodb://localhost:27017/swan_core',
        SWAN_DRIVE_URL_API: "https://dev-drive-api.idin.tech",
        SWAN_DRIVE_RSA_PRIVATE_KEY: "jwtRS256_dev.key",
        SECRET_PHRASE: "8f8d1a33b6f62541b76534fefaa25bc7",
        JWT_MESSAGE: "textmeaningnothing",
        JWT_HONEY_MESSAGE: "heypentestergotcha",
        //ENV_DB: "mongodb",
        ENV_DB:"development",
        GET_POLICY_SOURCE_DATA: "ACTISURE",
        AWS_CONFIG: {
        accessKeyId: 'AKIARQZCZDUQBSI44WMF',
        secretAccessKey: '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',
        region: 'af-south-1'
        },
        DYNAMODB_TABLES: {
            REQUEST_LOGS: "dev_failed_requests",
            SECURITY_ALARMS_LOG: "dev_security_alarms",
            POLICIES_CACHE: "dev_policies_cache",
            STATISTICS: "dev_statistics",
            DEVICES_INFO: "dev_devices_info",
            //CLINIC PORTAL SPECIFICS
            TBLATTACHMENTS : "dev_clinicportal_tblattachments",
            TBLCASES : "dev_clinicportal_tblcases",
            TBLPATIENTADMISSIONS: "dev_clinicportal_tblpatientadmissions",
            TBLUSERS : "dev_clinicportal_tblusers",
            TBLDOCTORS : "dev_clinicportal_tbldoctors",
            TBLDIAGNOSIS: "dev_clinicportal_tbldiagnosis",
            TBLSURGICAL:"dev_clinicportal_tblsurgicalclassifications"
        }
    }
};

module.exports = config_env.default;
