import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

const User = props => {
  const { users, user, setUser } = props;
  const newUsers = users.map(item => item.name);
  return (
    <SelectDropdown
      data={newUsers}
      buttonStyle={{
        backgroundColor: '#FFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ced4da',
        height: 38,
        width: '100%',
      }}
      buttonTextStyle={{
        textAlign: 'left',
        fontSize: 16,
        marginHorizontal: 0,
      }}
      rowStyle={{ height: 38, backgroundColor: '#f4f5fb' }}
      rowTextStyle={{ textAlign: 'left', fontSize: 16 }}
      selectedRowStyle={{ backgroundColor: '#138496' }}
      selectedRowTextStyle={{ color: '#FFF' }}
      onSelect={(selectedItem, index) => {
        setUser(users[index]);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      defaultButtonText={user.name}
      defaultValueByIndex={0}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
};

export default User;
