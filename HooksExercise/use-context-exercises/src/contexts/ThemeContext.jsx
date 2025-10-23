import React, {createContext} from "react";

export const ThemeConText = createContext({
    theme: "light",
    toggleTheme: () => {}
});

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = React.useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const contextValue = {
        theme,
        toggleTheme
    };

    return (
        <ThemeConText.Provider value={contextValue}>
            {children}
        </ThemeConText.Provider>
    );
};

export const useTheme = () => {
    const context = React.useContext(ThemeConText);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}