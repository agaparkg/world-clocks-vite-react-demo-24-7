import { useEffect, useState } from "react";
import SingleTZBox from "./SingleTZBox";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
  const [timeZones] = useState(moment.tz.names());
  const [listOfSelectedTZ, setListOfSelectedTZ] = useState([]);
  const [selectedTZName, setSelectedTZName] = useState("");

  const handleAddTZ = () => {
    // const newListOfSelTZ = JSON.parse(JSON.stringify(listOfSelectedTZ));

    const tzExist = listOfSelectedTZ.find(
      (selTZ) => selTZ.zoneName === selectedTZName
    );

    if (!tzExist) {
      // !undefined ==> true
      const newListOfSelTZ = listOfSelectedTZ.map((tz) => {
        return {
          ...tz,
        };
      });

      const newTZObject = {
        id: uuidv4(),
        zoneName: selectedTZName,
        zoneTime: moment().tz(selectedTZName).format("hh:mm:ss A"),
      };

      newListOfSelTZ.push(newTZObject);

      setListOfSelectedTZ(newListOfSelTZ);
    } else {
      alert(
        "We already have this timezone. Please select a different timezone."
      );
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;

    if (value !== "- Select a timezone -") {
      setSelectedTZName(e.target.value);
    }
  };

  useEffect(() => {
    let intervalId;

    console.log(listOfSelectedTZ);

    if (listOfSelectedTZ.length) {
      intervalId = setTimeout(() => {
        const newListOfSelTZ = listOfSelectedTZ.map((tz) => {
          return {
            ...tz,
            zoneTime: moment().tz(tz.zoneName).format("hh:mm:ss A"),
          };
        });

        setListOfSelectedTZ(newListOfSelTZ);
      }, 1000);
    }

    return () => clearTimeout(intervalId);
  }, [listOfSelectedTZ]);

  return (
    <main>
      <aside>
        <div className="add-clock-box">
          <button onClick={handleAddTZ}>Add Clock</button>
          <select onChange={handleSelectChange} name="timezone" id="timezone">
            <option>- Select a timezone -</option>
            {timeZones.map((tz, index) => (
              <option key={index}>{tz}</option>
            ))}
            ;
          </select>
        </div>
      </aside>
      <section>
        {listOfSelectedTZ.map((selectedTZ) => {
          return <SingleTZBox key={selectedTZ.id} {...selectedTZ} />;
        })}
      </section>
    </main>
  );
};

export default Main;
