import React, { useEffect, useState, useCallback } from 'react';
import { NativeModules } from 'react-native';
import client from './client';
import Modal from './Components/Modal';
const useTwitter = (props) => {
    const [visible, setVisible] = useState(false);
    const [authURL, setAuthURL] = useState('');
    const [webViewState, setWebViewState] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const login = async (callback_url) => {
        const url = await client.getLoginUrl(callback_url);
        setAuthURL(url);
        setVisible(true);
    };
    const clearCookies = (callback = () => { }) => {
        NativeModules.Networking.clearCookies(callback);
    };
    const TWModal = useCallback((modalProps) => {
        const onWebViewStateChanged = (webViewNavigation) => {
            setWebViewState(webViewNavigation);
        };
        return (<Modal visible={visible} authURL={authURL} onClosePress={() => setVisible(false)} onWebViewStateChanged={onWebViewStateChanged} headerColor={modalProps.headerColor} closeText={modalProps.closeText} renderHeader={modalProps.renderHeader}/>);
    }, [visible]);
    useEffect(() => {
        if (webViewState) {
            const match = webViewState.url.match(/\?oauth_token=.+&oauth_verifier=(.+)/);
            if (match && match.length > 0) {
                setVisible(false);
                setAuthURL('');
                client.getAccessToken(match[1]).then((response) => {
                    client.setAccessToken(response.oauth_token, response.oauth_token_secret);
                    setLoggedIn(true);
                }).catch((err) => {
                    console.warn(`[getAccessToken failed] ${err}`);
                    if (props?.onError) {
                        props.onError(err);
                    }
                });
            }
        }
    }, [webViewState]);
    useEffect(() => {
        if (loggedIn && props?.onSuccess) {
            const options = {
                include_entities: false,
                skip_status: true,
                include_email: true,
            };
            client.api('GET', 'account/verify_credentials.json', options).then((response) => {
                props.onSuccess(response, { oauth_token: client.Token, oauth_token_secret: client.TokenSecret });
                setLoggedIn(false);
            }).catch((err) => {
                console.warn(`[get("account/verify_credentials.json") failed] ${err}`);
                if (props?.onError) {
                    props.onError(err);
                }
                setLoggedIn(false);
            });
        }
    }, [loggedIn]);
    return {
        twitter: {
            login,
            clearCookies,
            getAccessToken: () => ({ oauth_token: client.Token, oauth_token_secret: client.TokenSecret }),
            setAccessToken: client.setAccessToken,
            setConsumerKey: client.setConsumerKey,
            api: client.api,
            post: client.post,
            get: client.get,
        },
        TWModal,
    };
};
export default useTwitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaG9va3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU03QyxPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFFOUIsT0FBTyxLQUE4QixNQUFNLG9CQUFvQixDQUFDO0FBT2hFLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDbkMsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxRQUFRLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDdkQsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxRQUFRLENBQVMsRUFBRSxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxRQUFRLENBQTJCLElBQUksQ0FBQyxDQUFDO0lBQ2pGLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRXpELE1BQU0sS0FBSyxHQUFHLEtBQUssRUFBRSxZQUFxQixFQUFFLEVBQUU7UUFDNUMsTUFBTSxHQUFHLEdBQVcsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTNELFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0lBRUYsTUFBTSxZQUFZLEdBQUcsQ0FBQyxXQUFzQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUN2RSxhQUFhLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUM7SUFF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QUNyQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUVmLE9BQU87UUFDTCxPQUFPLEVBQUU7WUFDUCxLQUFLO1lBQ0wsWUFBWTtZQUNaLGNBQWMsRUFBRSxHQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxRyxjQUFjLEVBQUUsTUFBTSxDQUFDLGNBQWM7WUFDckMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjO1lBQ3JDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRztZQUNmLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNqQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7U0FDaEI7UUFDRCxPQUFPO0tBQ1IsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLGVBQWUsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF0aXZlTW9kdWxlcyB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5cbi8qIG5vZGVfbW9kdWxlcyAqL1xuaW1wb3J0IHsgV2ViVmlld05hdmlnYXRpb24gfSBmcm9tICdyZWFjdC1uYXRpdmUtd2Vidmlldyc7XG5cbi8qIGNsaWVudCAqL1xuaW1wb3J0IGNsaWVudCBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlLCBBY2Nlc3NUb2tlbiwgVHdpdHRlclVzZXIgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCBNb2RhbCwgeyBQcm9wcyBhcyBNb2RhbFByb3BzIH0gZnJvbSAnLi9Db21wb25lbnRzL01vZGFsJztcblxudHlwZSBQcm9wcyA9IHtcbiAgb25TdWNjZXNzOiAodXNlcjogVHdpdHRlclVzZXIsIGFjY2Vzc1Rva2VuOiBBY2Nlc3NUb2tlbikgPT4gdm9pZCxcbiAgb25FcnJvcj86IChlcnI6IEVycm9yUmVzcG9uc2UpID0+IHZvaWQsXG59XG5cbmNvbnN0IHVzZVR3aXR0ZXIgPSAocHJvcHM/OiBQcm9wcykgPT4ge1xuICBjb25zdCBbdmlzaWJsZSwgc2V0VmlzaWJsZV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFthdXRoVVJMLCBzZXRBdXRoVVJMXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbd2ViVmlld1N0YXRlLCBzZXRXZWJWaWV3U3RhdGVdID0gdXNlU3RhdGU8V2ViVmlld05hdmlnYXRpb24gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvZ2dlZEluLCBzZXRMb2dnZWRJbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3QgbG9naW4gPSBhc3luYyAoY2FsbGJhY2tfdXJsPzogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSBhd2FpdCBjbGllbnQuZ2V0TG9naW5VcmwoY2FsbGJhY2tfdXJsKTtcblxuICAgIHNldEF1dGhVUkwodXJsKTtcbiAgICBzZXRWaXNpYmxlKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyQ29va2llcyA9IChjYWxsYmFjazogKHJlc3VsdDogYm9vbGVhbikgPT4gdm9pZCA9ICgpID0+IHsgfSkgPT4ge1xuICAgIE5hdGl2ZU1vZHVsZXMuTmV0d29ya2luZy5jbGVhckNvb2tpZXMoY2FsbGJhY2spO1xuICB9O1xuXG4gIGNvbnN0IFRXTW9kYWwgPSB1c2VDYWxsYmFjaygobW9kYWxQcm9wczogTW9kYWxQcm9wcykgPT4ge1xuICAgIGNvbnN0IG9uV2ViVmlld1N0YXRlQ2hhbmdlZCA9ICh3ZWJWaWV3TmF2aWdhdGlvbjogV2ViVmlld05hdmlnYXRpb24pID0+IHtcbiAgICAgIHNldFdlYlZpZXdTdGF0ZSh3ZWJWaWV3TmF2aWdhdGlvbik7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWxcbiAgICAgICAgdmlzaWJsZT17dmlzaWJsZX1cbiAgICAgICAgYXV0aFVSTD17YXV0aFVSTH1cbiAgICAgICAgb25DbG9zZVByZXNzPXsoKSA9PiBzZXRWaXNpYmxlKGZhbHNlKX1cbiAgICAgICAgb25XZWJWaWV3U3RhdGVDaGFuZ2VkPXtvbldlYlZpZXdTdGF0ZUNoYW5nZWR9XG4gICAgICAgIGhlYWRlckNvbG9yPXttb2RhbFByb3BzLmhlYWRlckNvbG9yfVxuICAgICAgICBjbG9zZVRleHQ9e21vZGFsUHJvcHMuY2xvc2VUZXh0fVxuICAgICAgICByZW5kZXJIZWFkZXI9e21vZGFsUHJvcHMucmVuZGVySGVhZGVyfVxuICAgICAgLz5cbiAgICApO1xuICB9LCBbdmlzaWJsZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHdlYlZpZXdTdGF0ZSkge1xuICAgICAgY29uc3QgbWF0Y2ggPSB3ZWJWaWV3U3RhdGUudXJsLm1hdGNoKC9cXD9vYXV0aF90b2tlbj0uKyZvYXV0aF92ZXJpZmllcj0oLispLyk7XG5cbiAgICAgIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICBzZXRBdXRoVVJMKCcnKTtcblxuICAgICAgICBjbGllbnQuZ2V0QWNjZXNzVG9rZW4obWF0Y2hbMV0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgY2xpZW50LnNldEFjY2Vzc1Rva2VuKHJlc3BvbnNlLm9hdXRoX3Rva2VuLCByZXNwb25zZS5vYXV0aF90b2tlbl9zZWNyZXQpO1xuXG4gICAgICAgICAgc2V0TG9nZ2VkSW4odHJ1ZSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFtnZXRBY2Nlc3NUb2tlbiBmYWlsZWRdICR7ZXJyfWApO1xuXG4gICAgICAgICAgaWYgKHByb3BzPy5vbkVycm9yKSB7XG4gICAgICAgICAgICBwcm9wcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFt3ZWJWaWV3U3RhdGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChsb2dnZWRJbiAmJiBwcm9wcz8ub25TdWNjZXNzKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBpbmNsdWRlX2VudGl0aWVzOiBmYWxzZSxcbiAgICAgICAgc2tpcF9zdGF0dXM6IHRydWUsXG4gICAgICAgIGluY2x1ZGVfZW1haWw6IHRydWUsXG4gICAgICB9O1xuXG4gICAgICBjbGllbnQuYXBpPFR3aXR0ZXJVc2VyPignR0VUJywgJ2FjY291bnQvdmVyaWZ5X2NyZWRlbnRpYWxzLmpzb24nLCBvcHRpb25zKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBwcm9wcy5vblN1Y2Nlc3MocmVzcG9uc2UsIHsgb2F1dGhfdG9rZW46IGNsaWVudC5Ub2tlbiwgb2F1dGhfdG9rZW5fc2VjcmV0OiBjbGllbnQuVG9rZW5TZWNyZXQgfSk7XG5cbiAgICAgICAgc2V0TG9nZ2VkSW4oZmFsc2UpO1xuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4oYFtnZXQoXCJhY2NvdW50L3ZlcmlmeV9jcmVkZW50aWFscy5qc29uXCIpIGZhaWxlZF0gJHtlcnJ9YCk7XG5cbiAgICAgICAgaWYgKHByb3BzPy5vbkVycm9yKSB7XG4gICAgICAgICAgcHJvcHMub25FcnJvcihlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0TG9nZ2VkSW4oZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbbG9nZ2VkSW5dKTtcblxuICByZXR1cm4ge1xuICAgIHR3aXR0ZXI6IHtcbiAgICAgIGxvZ2luLFxuICAgICAgY2xlYXJDb29raWVzLFxuICAgICAgZ2V0QWNjZXNzVG9rZW46ICgpOiBBY2Nlc3NUb2tlbiA9PiAoeyBvYXV0aF90b2tlbjogY2xpZW50LlRva2VuLCBvYXV0aF90b2tlbl9zZWNyZXQ6IGNsaWVudC5Ub2tlblNlY3JldCB9KSxcbiAgICAgIHNldEFjY2Vzc1Rva2VuOiBjbGllbnQuc2V0QWNjZXNzVG9rZW4sXG4gICAgICBzZXRDb25zdW1lcktleTogY2xpZW50LnNldENvbnN1bWVyS2V5LFxuICAgICAgYXBpOiBjbGllbnQuYXBpLFxuICAgICAgcG9zdDogY2xpZW50LnBvc3QsXG4gICAgICBnZXQ6IGNsaWVudC5nZXQsXG4gICAgfSxcbiAgICBUV01vZGFsLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlVHdpdHRlcjtcbiJdfQ==