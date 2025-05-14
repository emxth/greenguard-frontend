import React from "react";
import PropTypes from "prop-types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Define styles for a professional and well-structured layout
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f8f9fa",
    padding: 40,
  },
  header: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  section: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#34495e",
  },
  text: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#95a5a6",
  },
});

const RecyclingPDF = ({ entry }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>Recycling Entry Details</Text>
      
      {/* Recycling Information */}
      <View style={styles.section}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{entry.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{entry.email}</Text>
        <Text style={styles.label}>Contact Number:</Text>
        <Text style={styles.text}>{entry.contactNumber}</Text>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.text}>{entry.location}</Text>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.text}>{entry.type}</Text>
        <Text style={styles.label}>File:</Text>
        <Text style={styles.text}>{entry.file || "No file attached"}</Text>
      </View>
      
      {/* Footer */}
      <Text style={styles.footer}>
        Thank you for contributing to a sustainable future!
      </Text>
    </Page>
  </Document>
);

RecyclingPDF.propTypes = {
  entry: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contactNumber: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    file: PropTypes.string,
  }).isRequired,
};

export default RecyclingPDF;