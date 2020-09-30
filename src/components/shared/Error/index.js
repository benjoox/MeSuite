// @flow
import React from 'react'

type ErrorBarProps = {
    message: string,
    resetError: () => '',
    status: boolean,
}

const ErrorBar = ({ message, resetError, status }: ErrorBarProps) => {
    return (
        <>
            {status ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#d24d4d',
                        color: 'yellow',
                        position: 'relative',
                        padding: '5px',
                    }}
                >
                    <p style={{ margin: '0' }}>{message}</p>
                    <button
                        type="button"
                        onClick={() => resetError()}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            position: 'absolute',
                            top: '10%',
                            right: '10%',
                        }}
                    >
                        X
                    </button>
                </div>
            ) : (
                ''
            )}
        </>
    )
}

export default ErrorBar
