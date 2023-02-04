import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChannelsList from "../../components/Channels/ChannelsList";
import Messages from "../../components/Messages/Messages";
import ServerList from "../../components/servers/ServerList";

function Root() {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <ServerList />
        <ChannelsList />
        <Messages />
      </div>
    </>
  );
}

export default Root;
