import { useTranslation } from "react-i18next";

/**
 * @param {string} errorCode is a key from locales file under errors namespace
 * @param {string} errorMsg (Optional) is a fallback value if transaction for errorCode not found.
 * If errorMsg is not passed then errorCode key itself became the fallback value.
 */

const Error = ({ errorCode, errorMsg, i18nKeyPrefix = "errors" }) => {
  const { t } = useTranslation("translation", { keyPrefix: i18nKeyPrefix });

  return (
    <div
      className="p-4 w-full mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      {t(errorCode, errorMsg)}
    </div>
  );
};

export { Error };
