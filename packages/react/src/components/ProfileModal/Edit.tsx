import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { IPutUserBody } from '@beoble/js-sdk';
import useBeoble from '../../hooks/useBeoble/useBeoble';
import Input from '../Input';
import Textarea from '../Textarea';
import { useBeobleSDK } from '../../hooks/useBeoble/useBeobleSDK';
import Spinner from '../Spinner';
import NftPicker from '../NftPicker';
import {
  EditProfileTitle,
  Footer,
  InputContainer,
  InputTitle,
  InputTitleContainer,
  ModalContent,
  ProfileImageContainer,
  SaveButton,
  TitleContainer,
} from './style';

export const EditProfile = () => {
  const [inputs, setInputs] = useState<IPutUserBody>({});
  const { user } = useBeoble();
  const { updateUser, data, isFetching } = useBeobleSDK();
  const disableInput = isFetching || !user;

  const handleSave = async () => {
    if (!user) throw new Error('user is not initialized!');
    updateUser(user.user_id, inputs);
  };

  const handleInputChage = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (data) {
      setInputs({
        alias: data.data.alias,
        description: data.data.description,
        display_name: data.data.display_name,
      });
    }
  }, [data]);

  useEffect(() => {
    console.log(user);
    if (user) {
      setInputs({
        alias: user.alias,
        display_name: user.display_name,
        description: user.description,
      });
    }
  }, [user]);

  return (
    <ModalContent>
      <TitleContainer>
        <EditProfileTitle>Profile Settings</EditProfileTitle>
      </TitleContainer>
      <ProfileImageContainer>
        <InputTitleContainer>
          <InputTitle>Profile Image</InputTitle>
        </InputTitleContainer>
        <NftPicker size={100} />
      </ProfileImageContainer>
      <InputContainer>
        <Input
          name="alias"
          label="Alias"
          placeholder="Enter username"
          value={inputs?.alias}
          onChange={handleInputChage}
          disabled={disableInput}
        />
      </InputContainer>
      <InputContainer>
        <Input
          name="display_name"
          label="Username"
          placeholder="Enter username"
          value={inputs?.display_name}
          onChange={handleInputChage}
          disabled={isFetching || !user}
        />
      </InputContainer>
      <InputContainer>
        <Textarea
          name="description"
          label="Description"
          placeholder="Describe yourself on web3!"
          value={inputs?.description}
          onChange={handleInputChage}
          disabled={isFetching || !user}
        />
      </InputContainer>
      <Footer>
        <SaveButton onClick={handleSave} disabled={isFetching || !user}>
          {isFetching ? <Spinner size={20} color="#ffffff" /> : 'Save'}
        </SaveButton>
      </Footer>
    </ModalContent>
  );
};
