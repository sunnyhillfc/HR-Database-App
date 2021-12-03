import { StyleSheet, Platform, StatusBar } from "react-native";
import Colours from "../constants/Colours";

export default StyleSheet.create({

    // Add status bar space for Android (<SafeAreaView> currently only works on iOS)
    safeAreaView: {  
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    
    // GENERAL STYLES
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 10,
        paddingTop: 20,
    },
    bodyText: {
        marginVertical: 5,
        fontSize: 17,
        color: '#2F4F4F',  // COLOUR: dark grey
        lineHeight: 24,
    },
    h1: {
        marginTop: 30,
        marginBottom: 5,
        fontSize: 30,
        color: '#941a1d',  // COLOUR: primary colour 1
        lineHeight: 35,
    },
    h2: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 24,
        color: '#262626',  // COLOUR: ROI Charcoal
        lineHeight: 24,
    },
    h3: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20,
        color: '#595959',  // COLOUR: ROI grey
        lineHeight: 25,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 50,
        fontSize: 17,
    },
    listItemBullet: {
        position: 'absolute',
        top: 1,
        left: 30,
    },
    button: {
        paddingVertical: 13,
        paddingHorizontal: 26,
        backgroundColor: '#778899',  // COLOUR: medium grey
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonMajor: {
        backgroundColor: '#941a1d',  // COLOUR: primary colour 1
    },
    buttonMajorText: {
        color: 'white',
    },
    buttonMinor: {
        backgroundColor: '#C0C0C0',  // COLOUR: light grey
    },
    buttonMinorText: {
        color: '#2F4F4F',  // COLOUR: dark grey
    },
    buttonSmall: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    buttonSmallText: {
        fontSize: 16,
    },
    buttonLarge: {
        paddingVertical: 22,
        paddingHorizontal: 36,
    },
    buttonLargeText: {
        fontSize: 20,
    },
    form: {
        marginVertical: 10,
    },
    fieldSet: {
        marginVertical: 15,
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#C0C0C0',  // COLOUR: light grey
        borderRadius: 5,
    },
    legend: {
        position: 'absolute',
        top: -18,
        left: 5,
        margin: 0,
        paddingHorizontal: 5,
        paddingVertical: 0,
        color: '#941a1d',  // COLOUR: main secondary colour
        backgroundColor: 'white',
    },
    formRow: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 2,
    },
    label: {
        width: 110,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 17,
    },
    textInput: {
        flexGrow: 1,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: '#C0C0C0',  // COLOUR: light grey
        borderRadius: 3,
    },
    picker: {
        flexGrow: 1,
        // width: 200,
        height: 42,
        // maxHeight: 40,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: '#C0C0C0',  // COLOUR: light grey
        borderRadius: 3,
    },
    pickerItem: {
        height: 42,
    },
    
    // HEADER
    
    headerBar: {
        backgroundColor: 'white',
    },
    headerBarTitle: {
        color: '#941a1d',  // COLOUR: primary colour 1
        textAlign: 'left',
    },

    // FOOTER NAVIGATION

    navBar: {
        backgroundColor: "#262626",  // COLOUR: ROI grey
    },
    navBarIcon: {
        marginBottom: -5
    },
    navBarLabel: {
        marginBottom: 3
    },

    // HOME SCREEN

    homeLogoContainer:{
        alignItems: 'center', 
        marginVertical: 20, 
    }, 

    homeLogo: {
        width:300, 
        height: 150,
        resizeMode: 'contain',
    },

    homeText: {
        textAlign: "center", 
        color: "#941a1d",
    },

    homeButtonContainer:{
        flexDirection: 'row', 
        justifyContent: 'center',
        marginVertical: 40,
    },

    homeButton:{
        marginHorizontal: 10,
    },



    // HELP SCREEN
    helpbtnContainer:{
        flexDirection: 'row',
        padding: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: "#ddd", 

    },

    //view person screen 
    personbtnContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: "#ddd", 

    }, 
    personList: {
        
    },
    personListItem: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderBottomColor: "#ddd",
        borderBottomWidth: 2,

    },
    personListItemDetails:{
        flex: 1,
    },
    personListItemName:{
        marginTop: 10, 
        fontSize: 22,

    },
    personListItemButtons:{
        flex: 1,
        width: 20,
    },

    personListItemButton:{
        marginVertical: 1, 
        paddingVertical: 4,
        fontSize: 14,
    },


    
    
});
