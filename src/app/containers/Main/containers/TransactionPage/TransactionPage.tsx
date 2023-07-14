import React from 'react';
import {
    Header, Menu, Window,
} from '@app/shared/components';


const TransactionPage = props => {
    return (
        <Window>
            <Header backBtn>
                <Menu />
            </Header>
            <div>Trans</div>
        </Window>
    );
};


export default TransactionPage;
