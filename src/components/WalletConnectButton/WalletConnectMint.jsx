import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './WalletConnectButton.css'

function WalletConnectButton() {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button onClick={openConnectModal} className='buynow-btn' size='large' type="primary" block>Connect Wallet</Button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button onClick={openChainModal} className='buynow-btn' size='large' type="primary" block>Wrong network</Button>
                                );
                            }
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default WalletConnectButton

