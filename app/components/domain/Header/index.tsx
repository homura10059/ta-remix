import { BookOpenIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React from "react";

export const Header: React.FC = () => {
    return (
        <div
            className={classNames(
                'flex',
                'justify-between',
                'content-center',
                'bg-primary-light',
                'p-1'
            )}
        >
            <BookOpenIcon className={'w-10 h-10'}/>
        </div>
    )
}

const Connect: React.FC = () => {
    return <Header />
}

export default Connect