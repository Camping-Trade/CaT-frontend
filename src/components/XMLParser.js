import XMLParser from "react-xml-parser";

export function parseXML(dataSet) {
  return new XMLParser().parseFromString(dataSet).children;
}