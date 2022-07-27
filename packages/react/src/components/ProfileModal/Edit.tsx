import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { IPutUserBody } from '@beoble/js-sdk';
import useBeoble from '../../hooks/useBeoble/useBeoble';
import Input from '../Input';
import Textarea from '../Textarea';
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
import { useBeobleModal } from '../../hooks';

export const EditProfile = () => {
  const [inputs, setInputs] = useState<IPutUserBody>({});
  const { userState, updateUser } = useBeoble();
  const { selectedNft } = useBeobleModal();
  const disableInput =
    userState.loading || userState.updating || !userState.data;

  const handleSave = async () => {
    console.log(inputs);
    if (!userState.data) throw new Error('user is not initialized!');
    updateUser(inputs);
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
    setInputs((prev) => ({
      ...prev,
      representative_media_url: selectedNft
        ? { update_type: 'NORMAL', elements: [selectedNft.image_url] }
        : undefined,
    }));
  }, [selectedNft]);

  useEffect(() => {
    if (userState.data) {
      setInputs({
        alias: userState.data.alias,
        description: userState.data.description ?? undefined,
        display_name: userState.data.display_name,
      });
    }
  }, [userState.data]);

  useEffect(() => {
    if (userState.data) {
      setInputs({
        alias: userState.data.alias,
        display_name: userState.data.display_name,
        description: userState.data.description ?? undefined,
      });
    }
  }, [userState.data]);

  return (
    <ModalContent>
      <TitleContainer>
        <EditProfileTitle>Profile Settings</EditProfileTitle>
      </TitleContainer>
      <ProfileImageContainer>
        <InputTitleContainer>
          <InputTitle>Profile Image</InputTitle>
        </InputTitleContainer>
        <NftPicker
          size={100}
          currentProfileImage={
            selectedNft?.image_url ??
            (userState.data?.representative_media_url
              ? userState.data.representative_media_url[0]
              : undefined)
          }
        />
      </ProfileImageContainer>
      <InputContainer>
        <Input
          name="alias"
          label="Alias"
          placeholder="Enter Alias"
          value={inputs?.alias}
          onChange={handleInputChage}
          disabled={disableInput}
        />
      </InputContainer>
      <InputContainer>
        <Input
          name="display_name"
          label="Display Name"
          placeholder="Enter Display Name"
          value={inputs?.display_name}
          onChange={handleInputChage}
          disabled={disableInput}
        />
      </InputContainer>
      <InputContainer>
        <Textarea
          name="description"
          label="Description"
          placeholder="Describe yourself on web3!"
          value={inputs?.description}
          onChange={handleInputChage}
          disabled={disableInput}
        />
      </InputContainer>
      <Footer>
        <SaveButton onClick={handleSave} disabled={disableInput}>
          {userState.loading ? <Spinner size={20} color="#ffffff" /> : 'Save'}
        </SaveButton>
      </Footer>
    </ModalContent>
  );
};
