/// <reference types="react" />
import { ErrorResponse, AccessToken, TwitterUser } from './types';
import { Props as ModalProps } from './Components/Modal';
declare type Props = {
    onSuccess: (user: TwitterUser, accessToken: AccessToken) => void;
    onError?: (err: ErrorResponse) => void;
};
declare const useTwitter: (props?: Props | undefined) => {
    twitter: {
        login: (callback_url?: string | undefined) => Promise<void>;
        clearCookies: (callback?: (result: boolean) => void) => void;
        getAccessToken: () => AccessToken;
        setAccessToken: (token: string, tokenSecret: string) => void;
        setConsumerKey: (consumerKey: string, consumerSecret: string) => void;
        api: <T>(method: import("./types").Method, endpoint: string, params?: any) => Promise<T>;
        post: (endpoint: string, params?: any) => Promise<any>;
        get: (endpoint: string, params?: any) => Promise<any>;
    };
    TWModal: (modalProps: ModalProps) => JSX.Element;
};
export default useTwitter;
