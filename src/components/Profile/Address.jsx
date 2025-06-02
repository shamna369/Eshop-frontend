import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import {
  useAddressDelete,
  useAddressPost,
} from "../../hooks/userHooks/useAddressUpdate";
import { useGetUserData } from "../../hooks/userHooks/useGetUserData";

const Address = () => {
  const { createAddressMutate, isError } = useAddressPost();
  const { deleteAddressMutate } = useAddressDelete();
  const { data, isLoading } = useGetUserData();
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  //   const { user } = useSelector((state) => state.user);

  //   const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      console.log({ country, city, address1, address2, zipCode, addressType });
      createAddressMutate({
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType,
      });
      setCountryCode("");
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode("");
      setAddressType("");
    }
  };

  const handleDelete = (id) => {
    deleteAddressMutate(id);
  };

  return (
    <div className="w-full p-5 bg-white shadow-md">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[60%] md:w-[40%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name="country"
                      id="country"
                      value={countryCode}
                      onChange={(e) => {
                        const code = e.target.value;
                        const countryname =
                          e.target.options[e.target.selectedIndex].text;

                        setCountry(countryname);
                        setCountryCode(code);
                        setCity("");
                      }}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      disabled={!countryCode}
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(countryCode).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData?.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`bg-blue-800 text-white p-2 w-full rounded-sm mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between flex-col sm:flex-row">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {data &&
        !isLoading &&
        data?.addresses?.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>

            <div className="pl-5 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1},{item.address2}
                <br />
                {item.country},{item.city}
                <br />
                {item.zipCode} (pin)
              </h6>
            </div>
            <div className="  flex items-center justify-between">
              <AiOutlineDelete
                className="cursor-pointer w-[16px] h-[16px]"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </div>
        ))}

      {data && !isLoading && data.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]  text-blue-800 pb-4">
          You do not have any saved address!
        </h5>
      )}
    </div>
  );
};
export default Address;
