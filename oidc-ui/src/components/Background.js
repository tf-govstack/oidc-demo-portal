import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { langConfigService } from "../services/langConfigService";

export default function Background({
  component,
  i18nKeyPrefix = "background",
}) {
  const { t, i18n } = useTranslation("translation", {
    keyPrefix: i18nKeyPrefix,
  });

  const { getLocaleConfiguration } = {
    ...langConfigService,
  };

  const navList = [
    "home",
    "polices",
    "departments",
    "gov_circulars",
    "recruitment",
    "about_us",
    "contact_us",
  ];

  const [langOptions, setLangOptions] = useState([]);

  const changeLanguageHandler = (e) => {
    i18n.changeLanguage(e.value);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };

  useEffect(() => {
    try {
      getLocaleConfiguration().then((response) => {
        let lookup = {};
        let supportedLanguages = response.languages;
        let langData = [];
        for (let lang in supportedLanguages) {
          //check to avoid duplication language labels
          if (!(supportedLanguages[lang] in lookup)) {
            lookup[supportedLanguages[lang]] = 1;
            langData.push({
              label: supportedLanguages[lang],
              value: lang,
            });
          }
        }
        setLangOptions(langData);
      });
    } catch (error) {
      console.error("Failed to load i18n bundle!");
    }
  }, []);

  return (
    <>
      <section className="flex flex-col h-screen">
        <nav className="bg-white border-gray-500">
          <div className="flex items-center grid grid-cols-3 md:order-2 justify-center mb-2 mt-2">
            <div className="flex items-center justify-center col-start-2">
              <img src="images/doctor_logo.png" className="w-16 h-16 mr-4" />
              <span className="title-font text-3xl text-gray-900 font-medium">
                {t("health_portal")}
              </span>
            </div>
            <div className="flex justify-end col-start-3 mr-3">
              <img src="images/language_icon.png" className="mr-2" />
              <Select
                styles={customStyles}
                isSearchable={false}
                className="appearance-none"
                value={null}
                options={langOptions}
                placeholder="Language"
                onChange={changeLanguageHandler}
              />
            </div>
          </div>
          <div className="bg-[#2F8EA3] border-gray-200 px-2 sm:px-4 py-3 rounded">
            <div className="flex items-center">
              <div className="flex w-full justify-evenly space-x-8 text-xl font-medium">
                {navList.map((element) => {
                  return (
                    <div key={element}>
                      <a
                        href="#"
                        className="text-gray-900 text-white hover:underline"
                        aria-current="page"
                      >
                        {t(element)}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
        <div className="container flex flex-grow md:flex-row flex-col h-fit">
          <div className="flex flex-col shadow-lg rounded-tr-[64px] bg-[#FAFAFC] md:w-1/2">
            <div className="h-3/5 mt-5 flex justify-center">
              <img alt="util" src="images/illustartion.png" />
            </div>
            <div className="flex w-full justify-center mt-8">
              <div className="flex grid grid-cols-3 gap-8">
                <div className="flex flex-col justify-center bg-neutral-300 rounded w-32 h-24">
                  <span className="font-bold flex justify-center">
                    {t("confirmed")}
                  </span>
                  <span className="font-bold flex justify-center">
                    39,67,888
                  </span>
                </div>
                <div className="flex flex-col justify-center bg-[#2F8EA3] rounded w-32 h-24">
                  <span className="font-bold flex justify-center">
                    {t("active")}
                  </span>
                  <span className="font-bold flex justify-center">5,000</span>
                </div>
                <div className="flex flex-col justify-center bg-neutral-300 rounded w-32 h-24">
                  <span className="font-bold flex justify-center">
                    {t("recovered")}
                  </span>
                  <span className="font-bold flex justify-center">
                    39,67,888
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex-grow mt-8 md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left">
            {component}
          </div>
        </div>
      </section>
    </>
  );
}
