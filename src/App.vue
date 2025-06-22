<!-- c/src/App.vue -->
<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import players from './players.js';

// 输入框的值
const inputValue = ref('');
// 过滤后的选手列表
const filteredPlayers = ref([]);
// 选中的选手
const selectedPlayer = ref(null);
// 谜底选手
const secretPlayer = ref(null);
// 猜测次数
const guessCount = ref(0);
// 控制弹窗显示
const showModal = ref(false);
// 弹窗内容
const modalMessage = ref('');
// 记录每次猜测的结果（0: 未猜, 1: 猜错, 2: 猜对）
const guessResults = ref(Array(10).fill(0));
// 存储每次猜测的提示信息
const guessHistory = ref([]);

// 国家与大洲的映射
const countryContinentMap = {
  Ukraine: 'Europe',
  Finland: 'Europe',
  Lithuania: 'Europe',
  Romania: 'Europe',
  Norway: 'Europe',
  Denmark: 'Europe',
  Slovakia: 'Europe',
  Latvia: 'Europe',
  // 可根据需要添加更多国家与大洲的映射
};

// 过滤选手列表
const filterPlayers = () => {
  // 根据输入框的值过滤选手列表
  filteredPlayers.value = players.filter(player =>
    player.name.toLowerCase().includes(inputValue.value.toLowerCase())
  );
};

// 比较出生日期
const compareBirthDate = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'green';
  } else if (diffDays <= 365) {
    return 'yellow';
  } else {
    return 'red';
  }
};

// 比较国籍
const compareNationality = (nation1, nation2) => {
  if (nation1 === nation2) {
    return 'green';
  }
  const continent1 = countryContinentMap[nation1];
  const continent2 = countryContinentMap[nation2];
  if (continent1 && continent2 && continent1 === continent2) {
    return 'yellow';
  }
  return 'red';
};

// 比较战队
const compareTeam = (team1, team2) => {
  return team1 === team2 ? 'green' : 'red';
};

// 比较位置
const comparePosition = (position1, position2) => {
  return position1 === position2 ? 'green' : 'red';
};

// 选择选手
const selectPlayer = (player) => {
  selectedPlayer.value = player;
  inputValue.value = player.name;
  filteredPlayers.value = [];

  // 记录本次猜测的提示信息
  const birthDateColor = compareBirthDate(player.birthDate, secretPlayer.value.birthDate);
  const nationalityColor = compareNationality(player.nationality, secretPlayer.value.nationality);
  const teamColor = compareTeam(player.team, secretPlayer.value.team);
  const positionColor = comparePosition(player.position, secretPlayer.value.position);
  const hint = `你选择的选手：${player.name}，出生日期：${player.birthDate}（${birthDateColor}），国籍：${player.nationality}（${nationalityColor}），战队：${player.team}（${teamColor}），位置：${player.position}（${positionColor}）`;
  guessHistory.value.push(hint);

  if (player.name === secretPlayer.value.name) {
    guessResults.value[guessCount.value] = 2;
    modalMessage.value = `恭喜你，在 ${guessCount.value + 1} 次内猜对了！谜底是 ${secretPlayer.value.name}，出生日期：${secretPlayer.value.birthDate}，国籍：${secretPlayer.value.nationality}，位置：${secretPlayer.value.position}，所在战队：${secretPlayer.value.team}`;
    showModal.value = true;
  } else {
    guessResults.value[guessCount.value] = 1;
  }

  guessCount.value++;

  if (guessCount.value >= 10) {
    modalMessage.value = `很遗憾，十次都没猜对。谜底是 ${secretPlayer.value.name}，出生日期：${secretPlayer.value.birthDate}，国籍：${secretPlayer.value.nationality}，位置：${secretPlayer.value.position}，所在战队：${secretPlayer.value.team}`;
    showModal.value = true;
  }
};

// 重置游戏
const resetGame = () => {
  inputValue.value = '';
  selectedPlayer.value = null;
  guessCount.value = 0;
  guessResults.value = Array(10).fill(0);
  guessHistory.value = [];
  selectSecretPlayer();
  showModal.value = false;
};

// 选择谜底选手
const selectSecretPlayer = () => {
  const randomIndex = Math.floor(Math.random() * players.length);
  secretPlayer.value = players[randomIndex];
};

onMounted(() => {
  selectSecretPlayer();
});
</script>

<template>
  <div class="game-container">
    <h1 class="game-title">弗一把</h1>
    <input v-model="inputValue" @input="filterPlayers" placeholder="输入选手名字" class="input-field">
    <ul v-if="filteredPlayers.length > 0" class="player-list">
      <li v-for="player in filteredPlayers" :key="player.name" @click="selectPlayer(player)" class="player-item">
        {{ player.name }}
      </li>
    </ul>
    <!-- 显示猜测结果小格 -->
    <div class="guess-results">
      <div 
        v-for="(result, index) in guessResults" 
        :key="index" 
        :style="{ backgroundColor: result === 0 ? 'white' : result === 1 ? 'red' : 'green' }"
        class="result-box"
      ></div>
    </div>
    <!-- 显示每次猜测的提示信息 -->
    <div class="guess-history" v-if="guessHistory.length > 0">
      <p v-for="(hint, index) in guessHistory" :key="index" class="hint-text">{{ hint }}</p>
    </div>
    <div class="player-info" v-if="selectedPlayer">
      <p>你选择的选手：{{ selectedPlayer.name }}</p>
      <p :style="{ backgroundColor: compareBirthDate(selectedPlayer.birthDate, secretPlayer.birthDate) }" class="info-item">
        出生日期：{{ selectedPlayer.birthDate }}
        <span v-if="selectedPlayer.birthDate !== secretPlayer.birthDate">
          {{ new Date(selectedPlayer.birthDate) < new Date(secretPlayer.birthDate) ? '↑' : '↓' }}
        </span>
      </p>
      <p :style="{ backgroundColor: compareNationality(selectedPlayer.nationality, secretPlayer.nationality) }" class="info-item">
        国籍：{{ selectedPlayer.nationality }}
      </p>
      <p :style="{ backgroundColor: compareTeam(selectedPlayer.team, secretPlayer.team) }" class="info-item">
        战队：{{ selectedPlayer.team }}
      </p>
      <p :style="{ backgroundColor: comparePosition(selectedPlayer.position, secretPlayer.position) }" class="info-item">
        位置：{{ selectedPlayer.position }}
      </p>
    </div>
    <!-- 弹窗 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ modalMessage }}</p>
        <button @click="resetGame" class="reset-button">再弗一把</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.game-title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
}

.input-field {
  padding: 12px;
  font-size: 18px;
  width: 350px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.player-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  width: 350px;
  background-color: white;
  position: absolute;
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
}

.player-item {
  padding: 12px;
  cursor: pointer;
}

.player-item:hover {
  background-color: #f0f0f0;
}

.guess-results {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}

.result-box {
  width: 25px;
  height: 25px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.guess-history {
  margin-top: 20px;
}

.hint-text {
  margin-bottom: 8px;
  font-size: 16px;
}

.player-info {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
}

.info-item {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 3px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.reset-button {
  padding: 12px 20px;
  font-size: 18px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.reset-button:hover {
  background-color: #0056b3;
}
</style>