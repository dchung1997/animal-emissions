import { useState } from "react";
import ForceLayout from "../components/ForceLayout";
import bird from "../assets/bird.png";
import * as data from "../assets/data.json";
import "./Groupings.css";
import { useEffect } from "react";

function Groupings() {
  const [currentData, setCurrentData] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Poultry");

  const options = [
    { value: "Poultry", label: "Poultry" },
    { value: "Beef", label: "Beef" },
    { value: "Fish and Seafood", label: "Fish and Seafood" },
    { value: "Pig", label: "Pig" },
    { value: "Other Meat", label: "Other Meat" },
    { value: "Sheep and Goat", label: "Sheep and Goat" },
  ];

  const handleChange = (event) => {
    const category = event.target.value;
    handleSelect(category);
    setSelectedValue(category);
  };

  const handleSelect = (item) => {
    const index = data.children.findIndex(function (d) {
      return d.name === item;
    });
    setCurrentData(data.children[index]);
  };

  useEffect(() => {
    handleSelect("Poultry");
  }, []);

  return (
    <div id="groupings">
      <img src={bird}></img>
      <div className="content">
        <p>
          Cras feugiat sagittis risus non pulvinar. Aliquam mollis tempus sem,
          ut vulputate felis ornare vel. Quisque vel arcu ut ex varius molestie
          at non sapien. In hac habitasse platea dictumst. Pellentesque rutrum
          euismod porta. Ut eu interdum dolor. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Sed arcu
          felis, consequat ac turpis non, euismod gravida ligula. Ut cursus
          cursus ex, nec commodo nibh feugiat vel. Donec magna nulla, tincidunt
          id tempor in, luctus eget orci. Etiam in orci id ipsum venenatis
          sagittis ac ac elit. Proin non lacinia ex.
        </p>
        <p>
          Nam non iaculis est. Duis cursus ultricies tempus. Maecenas
          ullamcorper orci ac suscipit consectetur. Duis ornare venenatis
          ligula, non faucibus tellus sodales a. Morbi at purus sed nulla
          laoreet tincidunt. Suspendisse dictum ante nibh, ac cursus elit
          maximus at. Donec nec semper erat. Morbi eu justo lacus. Aenean purus
          tellus, condimentum id commodo ut, vulputate eu diam. Quisque et risus
          at nunc interdum congue vel tempus neque. In posuere nunc lectus, ac
          interdum sapien pellentesque quis. Curabitur ac posuere velit.
          Maecenas sit amet est non nisi tempor posuere sed eget erat.
        </p>
        <p>
          Aliquam suscipit libero at orci hendrerit mattis. Nunc a felis odio.
          Proin lobortis egestas dolor ac venenatis. Ut maximus, nisl vitae
          vehicula fermentum, lacus massa sollicitudin orci, non vulputate
          libero mi eu nibh. Morbi est justo, accumsan eget dignissim id,
          pellentesque vitae diam. Fusce ut ultrices dolor, id aliquet ligula.
          In convallis porttitor nulla et tristique. Ut hendrerit tempor tortor
          vitae dignissim. Morbi vehicula vestibulum egestas. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Phasellus gravida metus non
          quam elementum rhoncus. Cras elementum id ipsum sed tincidunt. Proin
          sodales, nunc quis ultrices imperdiet, libero diam rutrum ligula, ut
          maximus mauris odio egestas est.
        </p>
        <select value={selectedValue} onChange={handleChange}>
          {options.map((option, i) => (
            <option value={option.value} defaultValue={selectedValue} key={i}>
              {option.label}
            </option>
          ))}
        </select>
        <ForceLayout data={currentData} />
      </div>
    </div>
  );
}

export default Groupings;
