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
                                    <Button onClick={openConnectModal} type='primary' size='medium'>Connect Wallet</Button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button onClick={openChainModal} type='primary' size='large'>Wrong network</Button>
                                );
                            }
                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <Button
                                        onClick={openChainModal}
                                        // style={{ display: 'flex', alignItems: 'center' }}
                                        // type="button"
                                        className='connect-btn chain-logo-btn hide-on-mobile'
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 18,
                                                    height: 18,
                                                    borderRadius: 999,
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ? chain.name : 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{
                                                            width: 18,
                                                            height: 18,
                                                            marginTop: '-4px'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        <span className="hide-on-mobile" style={{ marginLeft: '4px' }}>
                                            {chain.name}
                                        </span>
                                    </Button>
                                    {/* <Avatar className='user-avatar-icon' size={32} onClick={openAccountModal} icon={account?.ensAvatar || <UserOutlined />} /> */}
                                    <Button onClick={openAccountModal} className='connect-btn'>
                                        <span className='hide-on-desktop me-2'>
                                            {chain.hasIcon && (
                                                <div
                                                    style={{
                                                        background: chain.iconBackground,
                                                        width: 18,
                                                        height: 18,
                                                        borderRadius: 999,
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {chain.iconUrl && (
                                                        <img
                                                            alt={chain.name ? chain.name : 'Chain icon'}
                                                            src={chain.iconUrl}
                                                            style={{
                                                                width: 18,
                                                                height: 18,
                                                                marginTop: '-4px'
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </span>
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account?.displayBalance})`
                                            : ''}

                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default WalletConnectButton

