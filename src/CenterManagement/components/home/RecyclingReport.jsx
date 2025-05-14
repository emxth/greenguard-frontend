import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#166534'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#166534',
    marginBottom: 20
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#166534',
    borderBottomStyle: 'solid',
    minHeight: 30
  },
  tableHeader: {
    backgroundColor: '#dcfce7'
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#166534'
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#166534'
  },
  summary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0fdf4',
    borderRadius: 5
  },
  summaryText: {
    fontSize: 12,
    color: '#166534'
  }
});

const RecyclingReport = ({ entries }) => {
  // Calculate summary statistics
  const totalEntries = entries.length;
  const typeCount = entries.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Recycling Management System Report</Text>
        
        {/* Summary Section */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Entries: {totalEntries}</Text>
          {Object.entries(typeCount).map(([type, count]) => (
            <Text key={type} style={styles.summaryText}>
              {type}: {count} entries
            </Text>
          ))}
        </View>

        {/* Table Header */}
        <View style={[styles.table, styles.tableHeader]}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeaderCell]}>Name</Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell]}>Email</Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell]}>Contact</Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell]}>Location</Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell]}>Type</Text>
          </View>
        </View>

        {/* Table Body */}
        <View style={styles.table}>
          {entries.map((entry, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{entry.name}</Text>
              <Text style={styles.tableCell}>{entry.email}</Text>
              <Text style={styles.tableCell}>{entry.contactNumber}</Text>
              <Text style={styles.tableCell}>{entry.location}</Text>
              <Text style={styles.tableCell}>{entry.type}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={[styles.summaryText, { marginTop: 20 }]}>
          Generated on: {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
};

export default RecyclingReport; 