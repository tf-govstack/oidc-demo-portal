export default function Background({ component }) {
  const navList = [
    "Home",
    "Polices",
    "Departments",
    "Gov Circulars",
    "Recruitment",
    "About Us",
    "Contact Us",
  ];
  return (
    <>
      <section className="flex flex-col h-screen">
        <nav className="bg-white border-gray-500">
          <div className="flex items-center md:order-2 justify-center mb-2 mt-2">
            <img src="images/doctor_logo.png" className="w-16 h-16 mr-4" />
            <span className="title-font text-3xl text-gray-900 font-medium">
              Health Portal
            </span>
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
                        {element}
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
                    Confirmed
                  </span>
                  <span className="font-bold flex justify-center">
                    39,67,888
                  </span>
                </div>
                <div className="flex flex-col justify-center bg-[#2F8EA3] rounded w-32 h-24">
                  <span className="font-bold flex justify-center">Active</span>
                  <span className="font-bold flex justify-center">5,000</span>
                </div>
                <div className="flex flex-col justify-center bg-neutral-300 rounded w-32 h-24">
                  <span className="font-bold flex justify-center">
                    Recovered
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
