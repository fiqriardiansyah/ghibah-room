import React from 'react';
import Styled from 'styled-components';

import {mediaQueries} from '../../utils/mediaQueries';

const Svg = Styled.svg`
    fill: ${props => props.active ? '#8e24aa' : '#38006b'};
    width: 3rem;
    height: 3rem;
    transition: all .2s;

    :hover{
        fill: #8e24aa;
    }

    ${mediaQueries("sm")`
        width: 4rem;
        height: 4rem;
    `}
`

const ChatsIcon = props =>{
    return (
        <Svg active={props.active}  xmlns="http://www.w3.org/2000/svg"  id="Capa_1"  viewBox="0 0 512 512"  >
<g>
	<g>
		<path d="M304,96H112c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h192c8.832,0,16-7.168,16-16C320,103.168,312.832,96,304,96z"/>
	</g>
</g>
<g>
	<g>
		<path d="M240,160H112c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h128c8.832,0,16-7.168,16-16    C256,167.168,248.832,160,240,160z"/>
	</g>
</g>
<g>
	<g>
		<path d="M352,0H64C28.704,0,0,28.704,0,64v320c0,6.208,3.584,11.872,9.216,14.496C11.36,399.488,13.696,400,16,400    c3.68,0,7.328-1.28,10.24-3.712L117.792,320H352c35.296,0,64-28.704,64-64V64C416,28.704,387.296,0,352,0z M384,256    c0,17.632-14.336,32-32,32H112c-3.744,0-7.36,1.312-10.24,3.712L32,349.856V64c0-17.632,14.336-32,32-32h288    c17.664,0,32,14.368,32,32V256z"/>
	</g>
</g>
<g>
	<g>
		<path d="M448,128c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16c17.664,0,32,14.368,32,32v270.688l-54.016-43.2    c-2.816-2.24-6.368-3.488-9.984-3.488H192c-17.664,0-32-14.368-32-32v-16c0-8.832-7.168-16-16-16c-8.832,0-16,7.168-16,16v16    c0,35.296,28.704,64,64,64h218.368l75.616,60.512C488.896,510.816,492.448,512,496,512c2.336,0,4.704-0.512,6.944-1.568    C508.48,507.744,512,502.144,512,496V192C512,156.704,483.296,128,448,128z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</Svg>
    )
}

const FriendsIcon = props =>{
    return (
        <Svg active={props.active} xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="0 -40 512 511" width="512pt"><path d="m497 193.300781h-40.167969c-1.214843 0-2.417969.050781-3.613281.128907-9.023438-8.050782-19.003906-14.699219-29.679688-19.820313 24.347657-17.292969 40.261719-45.710937 40.261719-77.777344 0-52.566406-42.765625-95.332031-95.332031-95.332031-52.570312 0-95.335938 42.765625-95.335938 95.332031 0 25.261719 9.882813 48.257813 25.976563 65.332031h-70.148437c16.09375-17.074218 25.972656-40.070312 25.972656-65.332031 0-52.566406-42.765625-95.332031-95.332032-95.332031-52.566406 0-95.335937 42.765625-95.335937 95.332031 0 29.480469 13.453125 55.875 34.539063 73.378907-14.601563 5.457031-28.148438 13.617187-40.027344 24.21875-1.195313-.078126-2.394532-.128907-3.609375-.128907h-40.167969c-8.285156 0-15 6.714844-15 15v80.332031c0 8.285157 6.714844 15 15 15h1.066406v113.535157c0 8.28125 6.714844 15 15 15h449.867188c8.285156 0 15-6.71875 15-15v-113.535157h1.066406c8.285156 0 15-6.714843 15-15v-80.332031c0-8.285156-6.714844-15-15-15zm-15 80.332031h-25.167969c-13.875 0-25.167969-11.289062-25.167969-25.167968 0-13.875 11.292969-25.164063 25.167969-25.164063h25.167969zm-178.867188-177.800781c0-36.023437 29.308594-65.332031 65.332032-65.332031 36.023437 0 65.335937 29.308594 65.335937 65.332031 0 36.027344-29.308593 65.332031-65.332031 65.332031-36.027344 0-65.335938-29.304687-65.335938-65.332031zm-143.53125-65.332031c36.023438 0 65.332032 29.308594 65.332032 65.332031 0 36.023438-29.308594 65.332031-65.332032 65.332031-36.027343 0-65.335937-29.304687-65.335937-65.332031 0-36.023437 29.308594-65.332031 65.335937-65.332031zm-129.601562 192.800781h25.167969c13.875 0 25.167969 11.289063 25.167969 25.167969 0 13.875-11.292969 25.164062-25.167969 25.164062h-25.167969zm16.066406 80.332031h9.101563c30.417969 0 55.167969-24.746093 55.167969-55.167968 0-16.84375-7.601563-31.941406-19.539063-42.066406h.355469c15.503906-9.917969 33.535156-15.230469 52.382812-15.230469h142.886719c-27.757813 23.398437-45.421875 58.40625-45.421875 97.464843v113.535157h-130.667969v-65.335938c0-8.28125-6.714843-15-15-15-8.28125 0-15 6.71875-15 15v65.332031h-34.265625zm419.867188 98.53125h-34.269532v-65.332031c0-8.28125-6.714843-15-15-15-8.28125 0-15 6.71875-15 15v65.332031h-130.664062v-113.53125c0-53.742187 43.722656-97.464843 97.46875-97.464843 18.933594 0 37.039062 5.359375 52.582031 15.359375-11.851562 10.128906-19.382812 25.164062-19.382812 41.941406 0 30.417969 24.746093 55.164062 55.167969 55.164062h9.097656zm0 0"/></Svg>
    )
}

const AlarmIcon = props =>{
    return (
        <Svg xmlns="http://www.w3.org/2000/svg"  id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" >
<g>
	<g>
		<path d="M466.96,380.91c-2.033-10.857-12.483-18.009-23.341-15.974c-10.856,2.035-18.009,12.485-15.975,23.341    c1.51,8.055-2.031,13.795-4.275,16.5c-2.239,2.697-7.215,7.223-15.38,7.223H104.397c-8.165,0-13.141-4.525-15.38-7.223    c-2.244-2.705-5.785-8.445-4.275-16.5c5.673-30.272,17.056-50.183,28.064-69.439C126.176,295.455,140,271.274,140,234v-30    c0-63.067,51.263-115.072,114.302-115.987h3.781C320.908,88.925,372,140.93,372,204v30c0,31.723,10.377,53.552,20.104,71.523    c3.62,6.688,10.5,10.484,17.606,10.484c3.215,0,6.477-0.777,9.502-2.415c9.715-5.257,13.327-17.395,8.069-27.108    C417.604,268.602,412,254.281,412,234v-30c0-41.161-15.943-80.037-44.894-109.466C342.296,69.312,310.439,53.574,276,49.23V20    c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v29.289C159.542,59.209,100,125.181,100,204v30    c0,26.647-9.673,43.566-21.919,64.986c-12.064,21.104-25.739,45.023-32.655,81.924c-3.301,17.616,1.369,35.626,12.813,49.414    C69.673,444.1,86.497,452,104.397,452h91.989c0,33.084,26.916,60,60,60s60-26.916,60-60h91.603c17.9,0,34.725-7.9,46.158-21.676    C465.591,416.536,470.261,398.526,466.96,380.91z M256.387,472c-11.028,0-20-8.972-20-20h40    C276.387,463.028,267.415,472,256.387,472z"/>
	</g>
</g>
<g>
	<g>
		<path d="M108.363,45.098c-8.23-7.368-20.874-6.668-28.241,1.562C41.352,89.97,20,145.85,20,204.006c0,11.046,8.954,20,20,20    s20-8.954,20-20c0-48.298,17.73-94.703,49.925-130.667C117.292,65.109,116.593,52.465,108.363,45.098z"/>
	</g>
</g>
<g>
	<g>
		<path d="M431.878,46.66c-7.367-8.229-20.012-8.929-28.241-1.562s-8.929,20.011-1.562,28.241    C434.27,109.304,452,155.708,452,204.006c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20    C492,145.85,470.648,89.97,431.878,46.66z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</Svg>
    )
}
const LogoutIcon = props =>{
    return (
        <Svg height="512pt" viewBox="0 0 512.016 512" width="512pt"><path d="m496 240.007812h-202.667969c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16 0 8.832032-7.167969 16-16 16zm0 0"/><path d="m416 320.007812c-4.097656 0-8.191406-1.558593-11.308594-4.691406-6.25-6.253906-6.25-16.386718 0-22.636718l68.695313-68.691407-68.695313-68.695312c-6.25-6.25-6.25-16.382813 0-22.632813 6.253906-6.253906 16.386719-6.253906 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.632813l-80 80c-3.136719 3.15625-7.230469 4.714843-11.328125 4.714843zm0 0"/><path d="m170.667969 512.007812c-4.566407 0-8.898438-.640624-13.226563-1.984374l-128.386718-42.773438c-17.46875-6.101562-29.054688-22.378906-29.054688-40.574219v-384c0-23.53125 19.136719-42.6679685 42.667969-42.6679685 4.5625 0 8.894531.6406255 13.226562 1.9843755l128.382813 42.773437c17.472656 6.101563 29.054687 22.378906 29.054687 40.574219v384c0 23.53125-19.132812 42.667968-42.664062 42.667968zm-128-480c-5.867188 0-10.667969 4.800782-10.667969 10.667969v384c0 4.542969 3.050781 8.765625 7.402344 10.28125l127.785156 42.582031c.917969.296876 2.113281.46875 3.480469.46875 5.867187 0 10.664062-4.800781 10.664062-10.667968v-384c0-4.542969-3.050781-8.765625-7.402343-10.28125l-127.785157-42.582032c-.917969-.296874-2.113281-.46875-3.476562-.46875zm0 0"/><path d="m325.332031 170.675781c-8.832031 0-16-7.167969-16-16v-96c0-14.699219-11.964843-26.667969-26.664062-26.667969h-240c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-15.9999995 16-15.9999995h240c32.363281 0 58.664062 26.3046875 58.664062 58.6679685v96c0 8.832031-7.167969 16-16 16zm0 0"/><path d="m282.667969 448.007812h-85.335938c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h85.335938c14.699219 0 26.664062-11.96875 26.664062-26.667968v-96c0-8.832032 7.167969-16 16-16s16 7.167968 16 16v96c0 32.363281-26.300781 58.667968-58.664062 58.667968zm0 0"/></Svg>
    );
}


const EmptyImageSvg = props =>{
    return (
        <svg height="512pt" viewBox="0 -12 512.00032 512" width="512pt"><path d="m279 90.0625-179.132812 98.363281 156.132812 85.734375 179.132812-98.363281zm0 0" fill="#fea02c"/><path d="m105.070312 393.699219 151.039063 82.9375v-202.480469l-151.039063-82.9375zm0 0" fill="#ffc66c"/><path d="m440.929688 375.699219v-191.472657l-108.929688 147.148438-38-18.5.109375 143.445312zm0 0" fill="#ffb954"/><g fill="#feda9b"><path d="m285 261.15625 59.183594 59.179688 157.816406-86.65625-59.183594-59.179688zm0 0"/><path d="m36.667969 247.011719 159.109375 87.367187 60.222656-60.222656-159.109375-87.367188zm0 0"/><path d="m440.929688 172.613281 60.667968-60.660156-156.527344-85.953125-60.667968 60.667969zm0 0"/><path d="m43 98.546875 57.765625 57.761719 155.234375-85.238282-57.765625-57.761718zm0 0"/></g><path d="m455.074219 172.613281 53.996093-53.996093c2.226563-2.222657 3.273438-5.367188 2.828126-8.480469-.441407-3.113281-2.328126-5.839844-5.085938-7.355469l-64.914062-35.644531c-4.839844-2.65625-10.917969-.886719-13.578126 3.953125-2.65625 4.84375-.890624 10.921875 3.953126 13.578125l53.234374 29.230469-46.339843 46.335937-166.667969-91.519531 46.335938-46.335938 46.839843 25.722656c4.839844 2.65625 10.921875.890626 13.578125-3.953124 2.660156-4.839844.890625-10.921876-3.953125-13.578126l-53.417969-29.335937c-3.898437-2.140625-8.742187-1.449219-11.882812 1.695313l-54 54-54-54c-3.144531-3.144532-7.988281-3.832032-11.882812-1.695313l-184.929688 101.546875c-2.757812 1.515625-4.644531 4.238281-5.085938 7.355469-.445312 3.113281.601563 6.257812 2.828126 8.480469l53.996093 53.996093-53.996093 53.992188c-2.226563 2.226562-3.273438 5.367187-2.828126 8.484375.441407 3.113281 2.328126 5.839844 5.085938 7.351562l55.882812 30.6875v102.570313c0 3.652343 1.988282 7.011719 5.1875 8.769531l184.929688 101.542969c1.5.824219 3.15625 1.234375 4.8125 1.234375s3.3125-.410156 4.8125-1.234375l184.929688-101.542969c3.199218-1.757812 5.1875-5.117188 5.1875-8.769531v-102.570313l55.882812-30.683594c2.757812-1.515624 4.644531-4.242187 5.085938-7.355468.445312-3.113282-.601563-6.257813-2.828126-8.480469zm-199.074219 90.132813-164.152344-90.136719 164.152344-90.140625 164.152344 90.140625zm-62.832031-240.367188 46.332031 46.335938-166.667969 91.519531-46.335937-46.335937zm-120.328125 162.609375 166.667968 91.519531-46.339843 46.339844-166.671875-91.519531zm358.089844 184.796875-164.929688 90.5625v-102.222656c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v102.222656l-164.929688-90.5625v-85.671875l109.046876 59.878907c1.511718.828124 3.167968 1.234374 4.808593 1.234374 2.589844 0 5.152344-1.007812 7.074219-2.929687l54-54 54 54c1.921875 1.925781 4.484375 2.929687 7.074219 2.929687 1.640625 0 3.296875-.40625 4.808593-1.234374l109.046876-59.878907zm-112.09375-46.9375-46.339844-46.34375 166.667968-91.515625 46.34375 46.335938zm0 0"/><path d="m404.800781 68.175781c2.628907 0 5.199219-1.070312 7.070313-2.933593 1.859375-1.859376 2.929687-4.4375 2.929687-7.066407 0-2.632812-1.070312-5.210937-2.929687-7.070312-1.859375-1.863281-4.441406-2.929688-7.070313-2.929688-2.640625 0-5.210937 1.066407-7.070312 2.929688-1.871094 1.859375-2.929688 4.4375-2.929688 7.070312 0 2.628907 1.058594 5.207031 2.929688 7.066407 1.859375 1.863281 4.441406 2.933593 7.070312 2.933593zm0 0"/><path d="m256 314.925781c-2.628906 0-5.210938 1.066407-7.070312 2.929688-1.859376 1.867187-2.929688 4.4375-2.929688 7.070312 0 2.636719 1.070312 5.207031 2.929688 7.078125 1.859374 1.859375 4.441406 2.921875 7.070312 2.921875s5.210938-1.0625 7.070312-2.921875c1.859376-1.871094 2.929688-4.441406 2.929688-7.078125 0-2.632812-1.070312-5.203125-2.929688-7.070312-1.859374-1.863281-4.441406-2.929688-7.070312-2.929688zm0 0"/></svg>
    )
}

const WarningImageSvg = props =>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" >
<path style="fill:#495A79;" d="M501.461,383.799L320.501,51.401C306.7,28.6,282.7,14.8,256,14.8s-50.7,13.8-64.501,36.601  L10.539,383.799C-3.259,407.501-3.56,435.701,9.941,459.4c13.499,23.699,37.798,37.8,65.099,37.8h361.92  c27.301,0,51.601-14.101,65.099-37.8C515.56,435.701,515.259,407.501,501.461,383.799z"/>
<path style="fill:#42516D;" d="M502.059,459.4c-13.499,23.699-37.798,37.8-65.099,37.8H256V14.8c26.7,0,50.7,13.801,64.501,36.601  L501.461,383.8C515.259,407.501,515.56,435.701,502.059,459.4z"/>
<path style="fill:#FFDE33;" d="M475.661,399.1L294.699,66.699C286.601,52.9,271.901,44.8,256,44.8s-30.601,8.101-38.699,21.899  L36.339,399.1c-8.399,14.101-8.399,31.199-0.298,45.3c8.099,14.399,22.798,22.8,39,22.8h361.92c16.201,0,30.901-8.401,39-22.8  C484.06,430.299,484.06,413.201,475.661,399.1z"/>
<path style="fill:#FFBC33;" d="M475.96,444.4c-8.099,14.399-22.798,22.8-39,22.8H256V44.8c15.901,0,30.601,8.101,38.699,21.899  L475.661,399.1C484.06,413.201,484.06,430.299,475.96,444.4z"/>
<g>
	<path style="fill:#495A79;" d="M256,437.2c-16.538,0-30-13.462-30-30s13.462-30,30-30s30,13.462,30,30S272.538,437.2,256,437.2z"/>
	<path style="fill:#495A79;" d="M286,317.2c0,16.538-13.462,30-30,30s-30-13.462-30-30v-150c0-16.538,13.462-30,30-30   s30,13.462,30,30V317.2z"/>
</g>
<g>
	<path style="fill:#42516D;" d="M286,407.2c0-16.538-13.462-30-30-30v60C272.538,437.2,286,423.738,286,407.2z"/>
	<path style="fill:#42516D;" d="M286,317.2v-150c0-16.538-13.462-30-30-30v210C272.538,347.2,286,333.738,286,317.2z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
    )
}

const FailImageSvg = props =>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" >
<path style="fill:#E50027;" d="M501.449,368.914L320.566,66.207C306.751,43.384,282.728,29.569,256,29.569  s-50.752,13.815-64.567,36.638L10.55,368.914c-13.812,23.725-14.113,51.954-0.599,75.678c13.513,23.723,37.836,37.838,65.165,37.838  h361.766c27.329,0,51.653-14.115,65.165-37.838C515.563,420.868,515.262,392.639,501.449,368.914z"/>
<path style="fill:#C1001F;" d="M502.049,444.592c-13.513,23.723-37.836,37.838-65.165,37.838H256V29.57  c26.727,0,50.752,13.815,64.567,36.638L501.45,368.915C515.262,392.639,515.563,420.868,502.049,444.592z"/>
<path style="fill:#FD003A;" d="M75.109,452.4c-16.628,0-30.851-8.27-39.063-22.669c-8.211-14.414-8.065-31.087,0.469-45.72  L217.23,81.549c8.27-13.666,22.816-21.951,38.769-21.951s30.5,8.284,38.887,22.157l180.745,302.49  c8.388,14.4,8.534,31.072,0.322,45.485c-8.211,14.4-22.435,22.669-39.063,22.669H75.109V452.4z"/>
<path style="fill:#E50027;" d="M436.891,452.4c16.628,0,30.851-8.27,39.063-22.669c8.211-14.414,8.065-31.087-0.322-45.485  L294.886,81.754c-8.388-13.871-22.933-22.157-38.887-22.157V452.4H436.891z"/>
<path style="fill:#E1E4FB;" d="M286.03,152.095v120.122c0,16.517-13.514,30.03-30.03,30.03s-30.031-13.514-30.031-30.03V152.095  c0-16.517,13.514-30.031,30.031-30.031S286.03,135.578,286.03,152.095z"/>
<path style="fill:#C5C9F7;" d="M286.03,152.095v120.122c0,16.517-13.514,30.03-30.03,30.03V122.064  C272.516,122.064,286.03,135.578,286.03,152.095z"/>
<path style="fill:#E1E4FB;" d="M256,332.278c-24.926,0-45.046,20.119-45.046,45.046c0,24.924,20.119,45.046,45.046,45.046  s45.046-20.121,45.046-45.046C301.046,352.398,280.925,332.278,256,332.278z"/>
<path style="fill:#C5C9F7;" d="M301.046,377.323c0,24.924-20.119,45.046-45.046,45.046v-90.091  C280.925,332.278,301.046,352.398,301.046,377.323z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
    )
}
export{
    AlarmIcon,
    LogoutIcon,
    FriendsIcon,
    ChatsIcon,
    EmptyImageSvg,
    WarningImageSvg,
    FailImageSvg
}