import React, { useState, useEffect } from 'react';
import {TabBar} from 'react-native-ui-lib'
import { Colors } from 'react-native-ui-lib'

export default function AdminTabs({set}) {

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
                label="Categories"
                selectedLabelStyle={{color: Colors.primary, fontWeight: "bold"}}
            />
            <TabBar.Item
                label="Manufacturers"
                selectedLabelStyle={{color: Colors.primary, fontWeight: "bold"}}
            />
            <TabBar.Item
                label="Sensors"
                badgeProps={{backgroundColor: Colors.secondary, padding: 10}}
                selectedLabelStyle={{color: Colors.primary, fontWeight: "bold"}}
            />
            <TabBar.Item
                label="Assign Techs"
                selectedLabelStyle={{color: Colors.primary, fontWeight: "bold"}}
            />
        </TabBar>
    );
}
