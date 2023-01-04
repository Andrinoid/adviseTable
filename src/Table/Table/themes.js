const themes = {
    light: {
        name: 'default',
        table: {
            background: '#fff',
            border: '1px solid #ebebeb',
        },
        header: {
            background: '#fafafa',
            borderBottom: 'solid 1px #ededed',
        },
        row: {

        },
        col: {
            background: '#fff',
        },
        colSecondary: {
            background: '#fafafa',
        },
        rowHoverCol: {
            background: '#e5f2fe',
        },
        cell: {
            border: '1px solid #ebebeb',
        },
    },
    dark: {
        name: 'dark',
        table: {
            background: '#000',
            border: '1px solid #ebebeb',
        },
        header: {
            background: '#000',
            // border: '1px solid #ebebeb',
            boxShadow: 'inset 0px 0px 0 0.5px #4a4c50',
        },
        row: {

        },
        col: {
            background: '#202124',
            color: '#bdc6cf',
            boxShadow: 'inset 0px 0px 0 0.5px #4a4c50',
        },
        rowHoverCol: {
            background: '#27314e',
            color: '#bdc6cf',
            boxShadow: 'inset 0px 0px 0 0.5px #4a4c50',
        },
        colSecondary: {
            background: '#202124',
            color: '#bdc6cf',
            boxShadow: 'inset 0px 0px 0 0.5px #4a4c50',
        },
        cell: {
            border: '1px solid #ebebeb',
        },
    }
}

export default themes;