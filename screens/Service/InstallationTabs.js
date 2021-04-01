import React, { useState, useEffect } from 'react';
import {TabBar} from 'react-native-ui-lib'
import { Colors } from 'react-native-ui-lib'

export default function InstallationTabs({set}) {

    useEffect(() => {
		Colors.loadColors({
			primary: '#6874e2',
			secondary: '#f9ce7f',
			mainbg: '#f5f6fa',
			sidebg: '#ffffff',
		});
	}, [Colors])


    return (
        <TabBar
            backgroundColor={Colors.sidebg}
            onTabSelected={(index) => set(index)}
            enableShadow
        >
            <TabBar.Item
                label="Pending"
                selectedLabelStyle={{color: Colors.primary, fontWeight: "bold"}}
            />
            <TabBar.Item
                label="Assigned"
                selectedLabelStyle={{color: Colors.primary, fontWeight: "bold"}}
            />
            <TabBar.Item
                label="Finished"
                selectedLabelStyle={{color: Colors.primary, fontWeight: "bold"}}
            />
        </TabBar>
    );
}
