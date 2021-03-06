import {StatusBar} from "expo-status-bar";
import React, {  useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  setLoading,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  function loadBusStopData() {
    setLoading(true)
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const myBus = responseData.services.filter(
          (item) => item.no === "155"
        )[0];
        console.log("My Bus Data");
        console.log(myBus);
        setArrival(myBus.next.time);
        setloading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 1000);
    return () => clearInterval(interval);
  }, []);

  function refreshBusStopData() {}

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bus Arrival Time:</Text>
      <Text style={styles.textTime}>
        {loading ? <ActivityIndicator size="large" /> : arrival}
      </Text>
      <TouchableOpacity style={styles.button} onPress={refreshBusStopData}>
        <Text style={styles.textButton}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  textTime: {
    marginBottom: 20,
    fontSize: 40,
    color: "#333333",
  },
  button: {
    marginBottom: 20,
    borderRadius: 6,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textButton: {
    fontSize: 20,
    color: "white",
  },
});
