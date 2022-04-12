import { useEffect, useState } from 'react';
import { fetchJsonData, fetchXmlData } from './api';
import './App.css';

export default function App() {
  const [api1Data, setApi1Data] = useState([]);
  const [api2Data, setApi2Data] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setApi1Data(await fetchJsonData());
    parseXmlToArray(await fetchXmlData());
  };

  const parseXmlToArray = (xml) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const peopleArray = [];
        const people = xhttp.responseXML.getElementsByTagName('person');
        for (let index = 0; index < people.length; index++) {
          const id = people[index].getElementsByTagName('id')[0].childNodes[0]
            .nodeValue;
          const firstName = people[index].getElementsByTagName('firstName')[0]
            .childNodes[0].nodeValue;
          const lastName = people[index].getElementsByTagName('lastName')[0]
            .childNodes[0].nodeValue;
          peopleArray.push({ id: Number(id), firstName, lastName });
        }
        setApi2Data(peopleArray);
      }
    };
    xhttp.open('GET', xml, true);
    xhttp.send();
  };

  const sortedData = [...api1Data, ...api2Data].sort((a, b) => a.id - b.id);
  const tableRowData = sortedData.map(({ id, firstName, lastName }) => (
    <tr key={id}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
    </tr>
  ));

  if (tableRowData.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>{tableRowData}</tbody>
    </table>
  );
}
