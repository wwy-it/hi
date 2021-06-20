import axios from 'axios'
import "./apply.css"
import { push } from '@/utils/cl-router'

interface Person {
    firstName: string;
    lastName: string;
}
export default {
    template: () => import('./apply.zml'),

    setup: function () {
        const params = {
            name: '',
            sex: '男',
            auth_id: '',
            cell_phone: '',
            company_address: '',
            estimate_turnover: '100万~200万',
        }

        const toastDom: HTMLElement = document.querySelector("#toast")
        const textMoreToastDom: HTMLElement = document.querySelector("#textMoreToast")

        document.querySelector("#showPicker").addEventListener("click", function () {
            let $this = this
            weui.picker([{
                label: '男',
                value: '男'
            }, {
                label: '女',
                value: '女'
            }], {
                onChange: function (result: any) {
                    console.log(result);
                },
                onConfirm: function (result: any) {
                    let sex = result[0].value
                    $this.innerText = sex
                    params.sex = sex
                },
                title: '性别'
            });
        }, false);

        document.querySelector("#turnover").addEventListener("click", function () {
            let $this = this
            weui.picker([
                {
                    label: '100万~200万',
                    value: '100万~200万'
                },
                {
                    label: '200万~500万',
                    value: '200万~500万'
                },
                {
                    label: '500万~1000万',
                    value: '500万~1000万'
                },
                {
                    label: '1000万~2000万',
                    value: '1000万~2000万'
                },
                {
                    label: '2000万以上',
                    value: '2000万以上'
                },
            ], {
                onChange: function (result: any) {
                    console.log(result);
                },
                onConfirm: function (result: any) {
                    let turnover = result[0].value
                    $this.innerText = turnover
                    params.estimate_turnover = turnover
                },
                title: '过去12个月'
            });
        }, false);

        document.querySelector("#complete").addEventListener("click", () => {
            const name_dom: HTMLInputElement = document.querySelector('#apply-name')
            const name: string = name_dom.value

            const id_dom: HTMLInputElement = document.querySelector('#apply-id')
            const id: string = id_dom.value

            const phone_dom: HTMLInputElement = document.querySelector('#apply-phone')
            let phone: string = phone_dom.value

            const address_dom: HTMLInputElement = document.querySelector('#apply-address')
            let address = address_dom.value

            params.name = name
            params.auth_id = id
            params.cell_phone = phone
            params.company_address = address

            console.log(params)

            axios({
                method: "post",
                url: "/add_new_owner",
                data: {
                    owner: { ...params }
                }
            }).then((res) => {
                console.log(res)
                toastDom.style.display = "block"
                setTimeout(function () {
                    toastDom.style.display = "none"
                }, 2000);

            }).catch((err) => {
                console.log(err)
                textMoreToastDom.style.display = "block"
                setTimeout(function () {
                    textMoreToastDom.style.display = "none"
                }, 2000);
            })
        }, false);
    }
}
