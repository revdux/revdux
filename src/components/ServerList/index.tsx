import axios from "axios";
import { memo, useEffect } from "react";
import Tooltip from "../Tooltip";
import { setServers } from "../../store/slices/serverListSlice";
import { setId, setUsername } from "../../store/slices/userAvatarSlice";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ServerList = memo(() => {
  const { servers } = useSelector((state: RootState) => state.serverList);
  const { id, username } = useSelector((state: RootState) => state.userAvatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket("wss://ws.revolt.chat");
    const token = localStorage.getItem("token");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "Authenticate",
          token: token,
        })
      );
      ws.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);
        if (message.type === "Ready") {
          const servers = message.servers ?? [];
          dispatch(setServers(servers));
        }
      };
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.revolt.chat/users/@me", {
        headers: {
          "x-session-token": token,
        },
      })
      .then((res) => {
        dispatch(setId(res.data.avatar._id));
        dispatch(setUsername(res.data.username));
      });
    axios
      .get("https://api.revolt.chat/sync/unreads", {
        headers: {
          "x-session-token": token,
        },
      })
      .then((res) => console.log(res.data));
  }, []);

  return (
    <div className="h-screen w-16 bg-slate-900 p-2">
      <Tooltip text={username}>
        <button onClick={() => navigate(`/`)}>
          <img
            src={`https://autumn.revolt.chat/avatars/${id}?max_side=96`}
            className="mb-1 rounded-full hover:rounded-lg"
          />
        </button>
      </Tooltip>
      <hr className="opacity-50" />
      {servers.map((server) => (
        <div key={server._id}>
          <Tooltip text={server.name}>
            <button onClick={() => navigate(`/server/${server._id}`)}>
              {server.icon ? (
                <img
                  src={`https://autumn.revolt.chat/${server.icon?.tag}/${server.icon?._id}?max_side=96`}
                  className="mt-2 flex h-12 w-12 items-center rounded-full hover:rounded-lg"
                />
              ) : (
                <div className="mt-2 h-12 w-12 items-center rounded-full bg-slate-800 hover:rounded-lg">
                  <p className="flex h-full items-center justify-center text-white">
                    {server.name[0]}
                  </p>
                </div>
              )}
            </button>
          </Tooltip>
        </div>
      ))}
    </div>
  );
});

export default ServerList;
