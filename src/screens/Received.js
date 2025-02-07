import { StyleSheet, SafeAreaView, View} from 'react-native';
import { Background } from '../components/Components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Received = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background Component */}
      <Background />
      <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        </View>
        <View style={styles.bodyContainer}>
          {/* Body content */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Make sure it's transparent to see the background
  },
  contentContainer: {
    position: 'absolute', // Position content above the background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between', // Ensures footer is at the bottom
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  headerContainer: {
    position: 'absolute', // Position content above the background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    zIndex: 20,
  },
  bodyContainer: {
    flex: 1,
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Received;
