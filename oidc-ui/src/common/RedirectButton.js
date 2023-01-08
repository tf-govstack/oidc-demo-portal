import { useTranslation } from "react-i18next";

const RedirectButton = ({ uri_idp_UI, text, logoPath }) => {
  const { t } = useTranslation("translation");

  return (
    <a
      href={uri_idp_UI + "&ui_locales=" + t("langCode")}
      className="w-full font-medium text-blue-600 hover:text-blue-500"
    >
      <button
        type="button"
        className="relative w-full text-black bg-gray-50 shadow-lg hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mr-2 mb-2"
      >
        {text}
        <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
          <img className="flex mr-1 ml-1 w-6 h-6" src={logoPath} />
        </div>
      </button>
    </a>
  );
};

export default RedirectButton;
