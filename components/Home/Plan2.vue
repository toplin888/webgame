<template>
    <section class="md:p-[110px]">
        <div class="m-container">
            <div class="flex justify-center">
                <div
                    class="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-500 font-bold text-[50px]">
                    {{ $t('home.diversifiedPremiumGames') }}
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-center text-[16px]">{{ $t('home.plan2Desc') }}</div>
        </div>
        <!-- 游戏展示部分 -->
        <div class="flex justify-center mt-[45px]">
            <div class="flex relative h-[350px] items-center">
                <NuxtImg v-for="(game, index) in gameFilter" :key="game.name" :src="'/images/game/' + game.image"
                    :class="[
                        'cursor-pointer rounded-[50px] relative hover:scale-[1.1]',
                        index === 2 ?
                            'w-[286px] h-[283px] z-[30] scale-110' :
                            `w-[calc(${game.width}px/2)] h-[calc(${game.height}px/2)] ${index < 2 ? '-mr-4' : '-ml-4'}`, `${(index == 1 || index == 3) ? 'w-[256px] h-[253px]' : index == 0 || index == 4 ? 'w-[160px] h-160px' : ''}`,
                        `${(index == 0) ? 'rotate-[-30deg]' : (index == 1) ? 'rotate-[-15deg]' : (index == 3) ? 'rotate-[15deg]' : (index == 4) ? 'rotate-[10deg]' : ''} `,
                        `${(index == 1 || index == 3) ? 'translate-y-15' : index == 0 || index == 4 ? 'translate-y-30' : ''}`
                    ]" :style="`z-index: ${index < 2 ? 20 - (2 - index) * 5 : 20 - (index - 2) * 5}`"
                    @click="selectGame(index)" :alt="game.name" />
            </div>
        </div>

        <div class="flex justify-center mt-6">
            <UButton color="lucky" class="h-[42px] text-[14px]" @click="openGameLink">
                {{ $t('nav.openDapp') }}
            </UButton>
        </div>
    </section>
</template>
<script setup lang="ts">
// import game1Img from '~/assets/images/game1.png'
// import game2Img from '~/assets/images/game2.png'
// import game3Img from '~/assets/images/game3.png'
// import game4Img from '~/assets/images/game4.png'
// import game5Img from '~/assets/images/game5.png'

// 游戏数据
const games = ref([
    {
        name: 'Game 1',
        image: 'game1.png',
        width: 175,
        height: 262,
        link: 'https://example.com/game1'
    },
    {
        name: 'Game 2',
        image: 'game2.png',
        width: 254,
        height: 381,
        link: 'https://example.com/game2'
    },
    {
        name: 'Game 3',
        image: 'game3.png',
        width: 302,
        height: 453,
        link: 'https://example.com/game3'
    },
    {
        name: 'Game 4',
        image: 'game4.png',
        width: 273,
        height: 410,
        link: 'https://example.com/game4'
    },
    {
        name: 'Game 5',
        image: 'game5.png',
        width: 171,
        height: 257,
        link: 'https://example.com/game5'
    }
])

// 选中的游戏索引
const selectedGame = ref(2) // 默认选中中间游戏


// 将被点击的游戏索引排序与第三个位置的互换位置
const gameFilter = computed(() => {
    // 克隆游戏数组，避免修改原始数据
    const gamesArray = [...games.value];

    // 计算中间位置索引 (基于 0 的索引，所以第三个位置是索引 2)
    const middlePosition = 2;

    // 如果选中的游戏不在中间位置
    if (selectedGame.value !== middlePosition) {
        // 保存选中游戏
        const selectedGameData = gamesArray[selectedGame.value];

        // 删除选中游戏
        gamesArray.splice(selectedGame.value, 1);

        // 在中间位置插入选中游戏
        gamesArray.splice(middlePosition, 0, selectedGameData);
    }

    return gamesArray;
})

// 创建一个映射，用于追踪重新排序后的游戏在原始数组中的索引
const indexMapping = computed(() => {
    const mapping = new Map();

    // 保存原始游戏引用与其索引的映射
    games.value.forEach((game, index) => {
        mapping.set(game, index);
    });

    // 为每个过滤后的游戏找到对应的原始索引
    return gameFilter.value.map(game => mapping.get(game));
});

// 选择游戏的方法（接收过滤后数组的索引）
const selectGame = (index: number) => {
    // 将过滤数组的索引转换为原始数组的索引
    selectedGame.value = indexMapping.value[index];
}


// 打开游戏链接
const openGameLink = () => {
    // 选取数组中间的游戏链接
    if (gameFilter.value[2]) {
        window.open(games.value[selectedGame.value].link, '_blank')
    }
}
</script>
<style scoped>
/* 添加一些动画效果 */
.cursor-pointer:hover {
    filter: brightness(1.1);
}
</style>