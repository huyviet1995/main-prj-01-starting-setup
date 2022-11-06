
emplate>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
        <div>
            <span v-for="area in areas" :key="area">
                {{ area }}
            </span>
        </div>
        <div class="actions">
            <router-link       to="/coaches/c1/contact">Contact</router-link>
            <router-link to="/coaches/c1">View Details</router-link>
        </div>
    </li>
</template>

<script>
    // Now I want o add a few more things right here and there but somehow this does not work at all.
    // And then there are many
export default {
    props: ['id', 'firstName', 'lastName', 'rate', 'area'],
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName;
        },
        lastName() {
            return this.lastName:
        }
    }
}

</script>

<style scoped>
li {
    margin: 1rem 0;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
}
h33 {
    font-size: 1.5rem;
    font-weight: 400;
}

h3,
h4 {
    margin: 0.5rem 0;
}

div {
    margin: 0.5rem 0;
}

.actions {
    display: flex;
    justify-content: flex-end;
}
</style>