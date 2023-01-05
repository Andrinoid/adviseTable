const themes = {
    light: {
        name: 'default',
        table: {
            background: '#fff',
            border: '1px solid #ebebeb',
        },
        header: {
            background: '#fafafa',
            // borderBottom: 'solid 1px #ededed',
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
        grid: {
            boxShadow: 'inset 0px 0px 0 0.5px #ebebeb',
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
        },
        row: {

        },
        col: {
            background: '#202124',
            color: '#bdc6cf',
        },
        rowHoverCol: {
            background: '#27314e',
            color: '#bdc6cf',
        },
        colSecondary: {
            background: '#202124',
            color: '#bdc6cf',
        },
        grid: {
            boxShadow: 'inset 0px 0px 0 0.5px #4a4c50',
        },
        cell: {
            border: '1px solid #ebebeb',
        },
    }
}

export default themes;