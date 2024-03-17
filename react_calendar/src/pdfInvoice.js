import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Font,
  Image,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";

const PDFGenerator = ({ data }) => {
  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
      },
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
        fontWeight: 700,
      },
    ],
  });
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      color: "gray",
      padding: "50px",
      borderRadius: "5px",
      textDecoration: "none",
      fontSize: "10px",
      fontFamily: "Roboto",
    },

    imageHeader: {
      width: "100%",
      height: "auto",
      overflow: "hidden",
      maxHeight: "160px",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },

    image: {
      width: "100%",
      height: "auto",
      objectFit: "cover",
    },

    hotelAddress: {
      fontSize: "8px",
      margin: "60px 0 20px 0",
    },

    hotelName: {
      fontFamily: "Roboto",
      fontWeight: "700",
      fontSize: "20px",
    },

    invoice: {
      margin: "20px 0",
      display: "flex",
      flexDirection: "row",
      wrap: "nowrap",
    },

    margin: {
      display: "flex",
      flexDirection: "row",
      margin: "5px 0",
      wrap: "nowrap",
    },

    title: {
      fontFamily: "Roboto",
      fontWeight: 700,
      width: "25%",
    },

    signature: {
      margin: "50px 0 0 0",
      display: "flex",
      flexDirection: "row",
    },

    signatureLeft: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
    },

    signatureRight: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
    },

    signatureLines: {
      marginBottom: "10px",
    },
  });

  const PDFDocument = (
    <Document>
      <Page size="LETTER" style={styles.container}>
        <View style={styles.imageHeader}>
          <Image style={styles.image} src="/images/hotel/hotel-home-6.jpg" />
        </View>
        <View style={styles.hotelAddress}>
          <Text style={styles.hotelName}>Mountain Lake Resort</Text>
          <Text>123 Lake View Ave</Text>
          <Text>San Remo, Italy</Text>
          <Text>123456</Text>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.title}>INVOICE:</Text>
          <Text> {data._id}</Text>
        </View>

        <View style={styles.margin}>
          <Text style={styles.title}>First Name:</Text>{" "}
          <Text> {data.guestFirstName}</Text>
        </View>
        <View style={styles.margin}>
          <Text style={styles.title}>Last Name:</Text>
          <Text> {data.guestLastName}</Text>
        </View>
        <View style={styles.margin}>
          <Text style={styles.title}>Room Category:</Text>
          <Text> {data.categoryId.name}</Text>
        </View>
        <View style={styles.margin}>
          <Text style={styles.title}>Room No.:</Text>
          <Text> {data.roomId.name}</Text>
        </View>
        <View style={styles.margin}>
          <Text style={styles.title}>Cost per night ($):</Text>
          <Text> {data.roomId.price.toFixed(2)}</Text>
        </View>
        <View style={styles.margin}>
          <Text style={styles.title}>Move-in:</Text>
          <Text> {data.dateMoveIn}</Text>
        </View>
        <View style={styles.margin}>
          <Text style={styles.title}>Move-out:</Text>
          <Text> {data.dateMoveOut}</Text>
        </View>
        <View style={styles.margin}>
          <Text style={styles.title}>Number of Nights:</Text>
          <Text> {data.numOfNights}</Text>
        </View>
        <View style={styles.margin}>
          <Text style={styles.title}>Total ($):</Text>
          <Text> {data.totalToPay.toFixed(2)}</Text>
        </View>

        <View style={styles.signature}>
          <View style={styles.signatureLeft}>
            <Text style={styles.signatureLines}>
              ______________________ (Signature)
            </Text>
            <Text style={styles.signatureLines}>Marco Lucci</Text>
            <Text style={styles.signatureLines}>Head Manager</Text>
          </View>
          <View style={styles.signatureRight}>
            <Text style={styles.signatureLines}>
              ______________________ (Signature)
            </Text>

            <Text style={styles.signatureLines}>
              {data.guestFirstName} {data.guestLastName}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={PDFDocument} fileName="invoice.pdf">
      {({ loading }) => (loading ? "Loading document..." : "Download Invoice")}
    </PDFDownloadLink>
  );
};

export default PDFGenerator;
