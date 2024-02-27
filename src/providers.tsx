import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {ConfigProvider} from 'antd';

export default function Providers({children}: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 1000,
        retry: 0
      },
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              itemColor: '#F1EBEA',
              linkColor: '#F1EBEA',
              separatorColor: '#F1EBEA',
              lastItemColor: '#F1EBEA',
              separatorMargin: 14,
              fontFamily: 'Ubuntu',
              colorBgTextHover: 'transparent',
              fontSize: 16
            },
            Input: {
              colorBgContainer: '#2C2A2E',
              fontFamily: 'Ubuntu',
              fontSize: 16,
              colorBorder: '#2C2A2E',
              colorText: '#F1EBEA',
              colorTextPlaceholder: '#929292',
              borderRadiusLG: 10,
              paddingBlock: 13,
              paddingInline: 40,
              hoverBorderColor: '#4E5BAB',
              colorPrimary: '#929292',
              paddingBlockLG: 12,
              paddingInlineLG: 22,
              activeShadow: 'none'
            },
            Select: {
              fontFamily: 'Ubuntu',
              colorText: '#F1EBEA',
              colorPrimary: '#3481EB',
              selectorBg: '#2C2A2E',
              singleItemHeightLG: 50,
              optionSelectedColor: '#F1EBEA',
              optionSelectedBg: '#3481EB',
              colorBgContainer: 'red',
              colorBgElevated: '#2C2A2E',
              colorBorder: 'transparent',
              colorPrimaryHover: '#3481EB',
              borderRadius: 10,
              optionPadding: 10,
              colorSplit: 'red',
              controlHeight: 46,
              controlPaddingHorizontal: 2,
              controlPaddingHorizontalSM: 2,
              optionSelectedFontWeight: 600,
              fontWeightStrong: 600,
              colorIcon: 'rgba(199,180,180,0.45)',
            },
            Radio: {
              buttonBg: 'rgba(44, 51, 62, 0.6)',
              buttonCheckedBg: '#3481EB',
              colorBorder: '#3481EB',
            },
            Modal: {
              contentBg: '#3A436A',
              headerBg: '#3A436A',
              titleColor: '#F1EBEA',
              titleFontSize: 20,
              fontFamily: 'Ubuntu',
              colorIcon: '#F1EBEA'
            }
          },
        }}
      >
        {children}
      </ConfigProvider>
    </QueryClientProvider>
  )
}
