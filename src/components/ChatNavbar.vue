<template>
    <div class="navcontainer">
        <div class="avatar">T</div>
        <div class="menu">
            <router-link to="/home/chathome" active-class="active">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 17.99V14.99M9.02 2.84001L3.63 7.04001C2.73 7.74001 2 9.23001 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29001 21.19 7.74001 20.2 7.05001L14.02 2.72001C12.62 1.74001 10.37 1.79001 9.02 2.84001Z"
                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </router-link>
            <router-link to="/home/message" active-class="active">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17 2H7C4.24 2 2 4.23 2 6.98V13.96C2 16.71 4.24 18.94 7 18.94H8.5C8.77 18.94 9.13 19.12 9.3 19.34L10.8 21.33C11.46 22.21 12.54 22.21 13.2 21.33L14.7 19.34C14.89 19.09 15.19 18.94 15.5 18.94H17C19.76 18.94 22 16.71 22 13.96V6.98C22 4.23 19.76 2 17 2ZM8 12C7.44 12 7 11.55 7 11C7 10.45 7.45 10 8 10C8.55 10 9 10.45 9 11C9 11.55 8.56 12 8 12ZM12 12C11.44 12 11 11.55 11 11C11 10.45 11.45 10 12 10C12.55 10 13 10.45 13 11C13 11.55 12.56 12 12 12ZM16 12C15.44 12 15 11.55 15 11C15 10.45 15.45 10 16 10C16.55 10 17 10.45 17 11C17 11.55 16.56 12 16 12Z"
                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </router-link>
        </div>
        <div class="set">
            <svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 14C11.7956 14 12.5587 13.6839 13.1213 13.1213C13.6839 12.5587 14 11.7956 14 11C14 10.2044 13.6839 9.44129 13.1213 8.87868C12.5587 8.31607 11.7956 8 11 8C10.2044 8 9.44129 8.31607 8.87868 8.87868C8.31607 9.44129 8 10.2044 8 11C8 11.7956 8.31607 12.5587 8.87868 13.1213C9.44129 13.6839 10.2044 14 11 14V14Z"
                    stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path
                    d="M1 11.88V10.12C1 9.08 1.85 8.22 2.9 8.22C4.71 8.22 5.45 6.94 4.54 5.37C4.02 4.47 4.33 3.3 5.24 2.78L6.97 1.79C7.76 1.32 8.78 1.6 9.25 2.39L9.36 2.58C10.26 4.15 11.74 4.15 12.65 2.58L12.76 2.39C13.23 1.6 14.25 1.32 15.04 1.79L16.77 2.78C17.68 3.3 17.99 4.47 17.47 5.37C16.56 6.94 17.3 8.22 19.11 8.22C20.15 8.22 21.01 9.07 21.01 10.12V11.88C21.01 12.92 20.16 13.78 19.11 13.78C17.3 13.78 16.56 15.06 17.47 16.63C17.99 17.54 17.68 18.7 16.77 19.22L15.04 20.21C14.25 20.68 13.23 20.4 12.76 19.61L12.65 19.42C11.75 17.85 10.27 17.85 9.36 19.42L9.25 19.61C8.78 20.4 7.76 20.68 6.97 20.21L5.24 19.22C4.8041 18.969 4.48558 18.5553 4.35435 18.0698C4.22311 17.5842 4.28988 17.0664 4.54 16.63C5.45 15.06 4.71 13.78 2.9 13.78C1.85 13.78 1 12.92 1 11.88V11.88Z"
                    stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>



        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.navcontainer {
    width: 100px;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding-top: 40px;
    box-sizing: border-box;

    .avatar {
        width: 50px;
        height: 50px;
        background-color: #615EF0;
        border-radius: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
    }

    .menu {
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-top: 60px;
        // background-color: pink;
        width: 60px;

        a {
            outline-style: none;
            width: 60px;
            height: 60px;
            // background-color: #615EF0;
            border-radius: 20px;

            svg {
                display: block;
                margin: auto auto;
                margin-top: 18px
            }
        }
        a:hover {
                background-color: #eee;
            }

        .active {
            svg {
                path {
                    fill: #615EF0;
                    stroke: #fff;
                }
            }
        }
        .active:hover {
                background-color: #eee;
            }
    }

    .set {
        margin-top: 300px
    }
}
</style>
