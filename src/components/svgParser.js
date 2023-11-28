import React, { useMemo, createElement } from "react";
import { parse } from "svg-parser";
import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet, View
} from "@react-pdf/renderer";

const PAGE_SIZE = "A4"; // You can change this to the desired page size

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff", // Set the background color if needed
  },
  svg: {
    width: "100%", // Set the width to fill the entire page
    height: "100%", // Set the height to fill the entire page
  },
});

const supportedStyleProps = [
  "color",
  "dominantBaseline",
  "fill",
  "fillOpacity",
  "fillRule",
  "opacity",
  "stroke",
  "strokeWidth",
  "strokeOpacity",
  "strokeLinecap",
  "strokeDasharray",
  "transform",
  "textAnchor",
  "visibility",
];

function isElementNode(node) {
  return node.type === 'element';
}

function removeLineBreaks(text) {
  if (typeof text === 'string') {
    return text.replace(/(\r\n|\n|\r)/gm, "");
  }
  return text;
}

const formatStringToCamelCase = (str) => {
  const splitted = str.split("-");
  if (splitted.length === 1) return splitted[0];
  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")
  );
};

const getStyleObjectFromString = (str) => {
  const style = {};
  if (!str) return {};
  str.split(";").forEach((el) => {
    let [property, value] = el.split(":");
    if (!property) return;
    if (property === "cursor") return;
    const formattedProperty = formatStringToCamelCase(property.trim());
    if (supportedStyleProps.includes(formattedProperty)) {
      if (formattedProperty === "strokeDasharray") {
        value = value.replace(/pt/g, ""); // dasharray has now px
      }
      style[formattedProperty] = value.trim();
    }
  });
  return style;
};

function handleRelativePositioning(node, parentX, parentY) {
  return {
    x: (Number(node.properties?.x ?? parentX ?? 0)) + Number(node.properties?.dx ?? 0),
    y: (Number(node.properties?.y ?? parentY ?? 0)) + Number(node.properties?.dy ?? 0),
  };
}

function getParentPosition(pos) {
  if (!pos) return 0;
  if (typeof pos === 'string') return Number(pos);
  return pos;
}

function svgToJSXWithRelPositioning(node, key, parentX, parentY) {
  if (typeof node === 'string') {
    return removeLineBreaks(node);
  }
  if (!isElementNode(node)) {
    return removeLineBreaks(node.value);
  }
  const elementName = node.tagName;
  if (!elementName) {
    return null;
  }
  let componentProps;
  if (node.tagName === 'desc' || node.tagName === 'defs') return null;
  if (node.properties !== undefined) {
    if (node.tagName === "text" || node.tagName === "tspan" || node.tagName === "rect") {
      componentProps = handleRelativePositioning(node, parentX, parentY);
      if (node.tagName !== "rect") {
        componentProps = {
          ...componentProps,
          textAnchor: node.properties['text-anchor'],
        };
      } else {
        componentProps = {
          ...node.properties,
          ...componentProps,
        };
      }
    } else {
      componentProps = node.properties;
    }
    if (node.properties.style) {
      componentProps = {
        ...componentProps,
        style: getStyleObjectFromString(node.properties.style),
      };
    }
  }
  let children = [];
  if (node.children && node.children.length > 0) {
    children = node.children.map(
      (childNode, i) =>
        svgToJSXWithRelPositioning(
          childNode,
          key + "-" + i,
          getParentPosition(node.properties.x),
          getParentPosition(node.properties.y)
        )
    );
  } else {
    children = [""];
  }
  componentProps = { ...componentProps, key: key ?? "root" };
  return createElement(elementName.toUpperCase(), componentProps, children);
}

const SvgComponent = ({ svgXml }) => {
  const svgElement = useMemo(() => {
    if (!svgXml || svgXml === "") return <></>;
    const svg = svgXml.replace(/px/g, "pt"); // replace all px with pt
    const parsed = parse(svg);
    return svgToJSXWithRelPositioning(parsed.children[0]);
  }, [svgXml]);

  return (
    <View style={styles.svg}>{svgElement}</View>
  );
};

export default function SvgParser({svgpic}) {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4">
            <SvgComponent svgXml={svgpic} />
          </Page>
        </Document>
      }
      fileName="somename.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
}
