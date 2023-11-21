import generateTimestampId from "utils/idGenerator";
import __stays from "./__stays.json";

const hoster = {
  id: generateTimestampId(),
  stays: [],
};

const stays = __stays.map((stay) => {
  return {
    ...stay,
    host: { ...stay.host, ...hoster },
  };
});

export default stays;
