import {TextInput, TouchableOpacity} from 'react-native';
import {Box} from './Box';
import {MagnifyingGlass} from 'phosphor-react-native';
import { useState } from 'react';

interface ISearch {
  onSearchInput : (search : string) => void;
}
export function SearchInput({onSearchInput}:ISearch) {

  const [search, setSearch] = useState("");

  function onInput () {
   onSearchInput(search);
  }
  return ( 
    <Box
      backgroundColor="shape"
      borderRadius={8}
      height={50}
      padding="s"
      flexDirection="row"
      alignItems="center"
      mt='s'
    >
      <TextInput placeholder="Pesquisar Treinos" style={{flex: 1, height: 40}} onChangeText={e => setSearch(e)}/>
      <TouchableOpacity onPress={() => onInput()}>
      <MagnifyingGlass />
      </TouchableOpacity>
    </Box>
  );
}
