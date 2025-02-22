import { Picker } from "@react-native-picker/picker";
import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  StyleSheet,
} from "react-native";

import { ThemeContext } from "../utils/ThemeProvider";

const SettingsScreen = memo(() => {
  const { t, i18n } = useTranslation();
  const { theme, changeTheme } = React.useContext(ThemeContext);

  const [enabledFilms, setEnabledFilms] = useState(true);
  const [enabledSerials, setEnabledSerials] = useState(true);
  const [enabledBooks, setEnabledBooks] = useState(true);
  const [enabledGames, setEnabledGames] = useState(true);
  const [enabledAnime, setEnabledAnime] = useState(true);
  const [enabledManga, setEnabledManga] = useState(true);

  const storeLang = useCallback(
    async (value) => {
      i18n.changeLanguage(value);
      try {
        await AsyncStorage.setItem("lang", value);
      } catch (err) {
        console.log("Unable to store language!");
      }
    },
    [i18n]
  );

  return (
    <SafeAreaView>
      <ScrollView style={{ margin: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={[
              styles.line,
              { flex: 0.05, backgroundColor: theme.primary },
            ]}
          />
          <Text style={[styles.sectionHeader, { color: theme.primary }]}>
            {t("General")}
          </Text>
          <View
            style={[
              styles.line,
              { flex: 0.95, backgroundColor: theme.primary },
            ]}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.option}>
            <Text style={[styles.caption, { color: theme.text }]}>
              {t("Language")}
            </Text>
            <View style={styles.value}>
              <Picker
                selectedValue={i18n.language}
                onValueChange={(itemValue, itemIndex) => storeLang(itemValue)}
                style={{ width: "80%", textAlign: "center", color: theme.text }}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Čeština" value="cz" />
                <Picker.Item label="Deutsch" value="de" />
                <Picker.Item label="Türk" value="tr" />
              </Picker>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.option}>
            <Text style={[styles.caption, { color: theme.text }]}>
              {t("Theme")}
            </Text>
            <View style={styles.value}>
              <Picker
                selectedValue={theme.name}
                onValueChange={(itemValue, itemIndex) => changeTheme(itemValue)}
                style={{ width: "80%", textAlign: "center", color: theme.text }}
              >
                <Picker.Item label={t("Light")} value="light" />
                <Picker.Item label={t("Dark")} value="dark" />
                <Picker.Item label={t("Yellow")} value="yellow" />
              </Picker>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={[
              styles.line,
              { flex: 0.05, backgroundColor: theme.primary },
            ]}
          />
          <Text style={[styles.sectionHeader, { color: theme.primary }]}>
            {t("Content")}
          </Text>
          <View
            style={[
              styles.line,
              { flex: 0.95, backgroundColor: theme.primary },
            ]}
          />
        </View>
        <View style={styles.section}>
          <View style={styles.option}>
            <Text style={[styles.caption, { color: theme.text }]}>
              {t("Films")}
            </Text>
            <View style={styles.value}>
              <Switch
                value={enabledFilms}
                onValueChange={() => setEnabledFilms((prev) => !prev)}
              />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.option}>
            <Text style={[styles.caption, { color: theme.text }]}>
              {t("Serials")}
            </Text>
            <View style={styles.value}>
              <Switch
                value={enabledSerials}
                onValueChange={() => setEnabledSerials((prev) => !prev)}
              />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.option}>
            <Text style={[styles.caption, { color: theme.text }]}>
              {t("Books")}
            </Text>
            <View style={styles.value}>
              <Switch
                value={enabledBooks}
                onValueChange={() => setEnabledBooks((prev) => !prev)}
              />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.option}>
            <Text style={[styles.caption, { color: theme.text }]}>
              {t("Games")}
            </Text>
            <View style={styles.value}>
              <Switch
                value={enabledGames}
                onValueChange={() => setEnabledGames((prev) => !prev)}
              />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.option}>
            <Text style={[styles.caption, { color: theme.text }]}>
              {t("Anime")}
            </Text>
            <View style={styles.value}>
              <Switch
                value={enabledAnime}
                onValueChange={() => setEnabledAnime((prev) => !prev)}
              />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.option}>
            <Text style={[styles.caption, { color: theme.text }]}>
              {t("Manga")}
            </Text>
            <View style={styles.value}>
              <Switch
                value={enabledManga}
                onValueChange={() => setEnabledManga((prev) => !prev)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  sectionHeader: {
    marginRight: 10,
    marginLeft: 10,
    fontWeight: "800",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  section: {
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  option: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  caption: {
    flex: 0.4,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  value: {
    flex: 0.6,
    alignItems: "flex-end",
  },
  divider: {
    height: 0.4,
    opacity: 0.4,
  },
  line: {
    height: 1.5,
  },
});

export default SettingsScreen;
