import { useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import UserInfo from "../Profile/UserInfo";

const Users = ({ value }) => {
  const { fetchProfile } = useData();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function temp() {
      const res = await fetchProfile(value);
      if (res.error) {
        setData(null);
      } else {
        setData(res);
      }
    }
    if (value) temp();
  }, [value]);

  return (
    data && (
      <UserInfo data={data} status={false} setData={setData} title={false} />
    )
  );
};

export default Users;
